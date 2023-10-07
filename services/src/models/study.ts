import { AppDataSource } from '../config/data-source';
import { Study, StudyHistory } from '../entity';
import { Repository } from 'typeorm';
import { tagColor } from '../utils/tagColor';

type StudyType = {
  studyId?: number;
  userId: string;
  studyYear: number;
  studyDate: number;
  studyTime: number;
  studyMinute: number;
  studyTagId?: number;
  studyContent?: string;
}

type StudyTimeType = {
  time: number;
  minute: number
}

type StudyWeekChartType = {
  label: string;
  data: number[],
  backgroundColor: string;
}

type StudyMonthChartReturnType = {
  labels: string[],
  monthChart: StudyMonthChartType[]
}

type StudyMonthChartType = {
  data: number[],
  backgroundColor: string[],
  borderColor: string[],
  borderWidth: number
}

class StudyModel {
  studyRepo: Repository<Study>
  studyHistoryRepo: Repository<StudyHistory>

  constructor() {
    this.studyRepo = AppDataSource.getRepository(Study);
    this.studyHistoryRepo = AppDataSource.getRepository(StudyHistory);
  }

  public async createStudy(study: StudyType) {

    //Studyテーブルを追加
    //追加後、StudyテーブルをユーザーIDで検索して、ID最大値のデータを最新データとして履歴テーブルに付随情報を転記していく。
    if (study == undefined) return false;

    try {
      await this.studyRepo.insert({
        userId: study.userId,
        studyYear: study.studyYear,
        studyDate: study.studyDate,
        studyTime: study.studyTime,
        studyMinute: study.studyMinute,
        studyTagId: study.studyTagId,
        studyContent: study.studyContent
      })

      const postStudy = await this.studyRepo.findOne({
        where: {
          userId: study.userId
        },
        order: {
          studyId: 'DESC',
        }
      })
      
      if (postStudy == null) {
        console.error('最新の学習情報の取得に失敗')
        return false
      }

      // Studyテーブルの更新完了後に履歴テーブルに更新後データを追加する
      // 履歴テーブルの時間はtime + minuteで設定する
      await this.studyHistoryRepo.insert({
        studyId: postStudy?.studyId,
        userId: study.userId,
        deletedFlg: ' ',
        studyYear: study.studyYear,
        studyDate: study.studyDate,
        studyTime: study.studyTime * 100 + study.studyMinute,
        studyTagId: study.studyTagId,
        studyContent: study.studyContent
      })
    } catch (e) {
      console.error('学習の登録に失敗:', e);
      return false;
    }

    return true;
  }

  public async readSingleStudy(id: number): Promise<Study | null> {
    const study: Study | null = await this.studyRepo.findOne({
      where: {
        studyId: id
      }
    })

    return study
  }

  public async readStudy(userId: string) {
    if (userId == '') return [];

    try {
      const studies: any = await this.studyRepo.query(`
        SELECT
          S.studyId as studyId,
          S.userId as userId,
          ST.id as tagId,
          ST.studyTagLabel as Study,
          S.studyDate as Date,
          S.studyTime as Time,
          S.studyMinute as Minutes,
          S.studyContent as Content
        FROM study AS S
        LEFT JOIN study_tag AS ST ON S.studyTagId = ST.id
        WHERE S.userId = '${userId}'
        ORDER BY S.createdAt DESC;
      `);

      // 返却するデータ内容を編集する。
      return studies;
    } catch (e) {
      console.error('readStudy:', e);
    }
  }
/**
 * 現在の年月日から学習した合計時間と合計分を取得
 * @param {string} userId ユーザーID
 * @param {number} date   現在年月日
 * @returns 時間 分
 */
  public async readDayOfStudyTime(userId: string, date: number) {

    const dayOfStudyTime = await this.studyRepo.query(`
      SELECT
        SUM(studyTime) AS time,
        SUM(studyMinute) AS minute
      FROM study
      WHERE userId = '${userId}' AND studyDate = '${date}'
    `);

    let studyTime: StudyTimeType = { time: 0, minute: 0 };

    dayOfStudyTime.map((data: any) => {
      let additionalTime = 0;
      if (data.minute >= 60) {
        // 学習時間の合計分が60分を超える場合は合計時間に加算する。
        additionalTime = Math.floor(data.minute / 60);
        data.minute = Math.floor(data.minute - (60 * Math.floor(data.minute / 60)));
      }
      studyTime = {
        time: data.time != null ? Number(data.time) + additionalTime : 0,
        minute: data.minute != null ? data.minute : 0
      }
  });

    return studyTime;
  };

  public async readWeekOfStudyTime(userId: string, weekStart: number, weekEnd: number) {
    let studyTime: StudyTimeType = { time: 0, minute: 0 };

    try {
      const weekOfStudyWeek = await this.studyRepo.query(`
        SELECT
          SUM(studyTime) AS time,
          SUM(studyMinute) AS minute
        FROM study
        WHERE userId = '${userId}' AND studyDate >= ${weekStart} AND studyDate <= ${weekEnd}
      `);

      weekOfStudyWeek.map((data: any) => {
        let additionalTime = 0;
        if (data.minute >= 60) {
          // 学習時間の合計分が60分を超える場合は合計時間に加算する。
          additionalTime = Math.floor(data.minute / 60);
          data.minute = Math.floor(data.minute - 60 * Math.floor(data.minute / 60));
        }
        studyTime = {
          time: data.time != null ? Number(data.time) + additionalTime : 0,
          minute: data.minute != null ? data.minute : 0
        }
      })
    } catch (e) {
      console.error(e);
    }

    return studyTime;
  };

  /**
   * 月間の学習時間を取得する。
   * @param {string} userId ユーザーID
   * @param {number} month  年 + 月
   */
  public async readMonthOfStudyTime(userId: string, month: number) {
    let studyTime: StudyTimeType = { time: 0, minute: 0 };

    try {
      const monthStart = month * 100;
      const monthEnd = month* 100 + 99;

      const monthOfStudyMonth = await this.studyRepo.query(`
        SELECT
          SUM(studyTime) as time,
          SUM(studyMinute) as minute
        FROM study
        WHERE userId = '${userId}' AND studyDate >= ${monthStart} AND studyDate <= ${monthEnd}
      `);

      monthOfStudyMonth.map((data: any) => {
        let additionalTime = 0;
        if (data.minute >= 60) {
          // 学習時間の合計分が60分を超える場合は合計時間に加算する。
          additionalTime = Math.floor(data.minute / 60);
          data.minute = Math.floor(data.minute - 60 * Math.floor(data.minute / 60));
        }
        studyTime = {
          time: data.time != null ? Number(data.time) + additionalTime : 0,
          minute: data.minute != null ? data.minute : 0
        }
      });
    } catch(e) {
      console.error(e);
    }

    return studyTime;
  }

  /**
   * 週間の学習時間をタグ別に取得する
   * @param {stirng} userId ユーザーID
   * @param {number} weekStart 週開始日
   * @returns {Array} datasets
   */
  public async readStudyWeekChart(userId: string, weekStart: number): Promise<StudyWeekChartType[]> {

    let datasets: StudyWeekChartType[] = [];

    // 一週間分の学習情報を一括で取得する(タグ情報を取得)
    // 事前に返却するための配列を作成することで、曜日ごとの学習時間の取得（後続処理）を簡単にする。
    // 曜日ごとの取得時にタグの情報を設定することが望ましいが、可読性と保守性を考慮して分離。
    const studyWeekTotal = await this.studyRepo.query(`
      SELECT
        ST.studyTagLabel as Study,
        ST.show
      FROM study AS S
      LEFT JOIN study_tag AS ST ON S.studyTagId = ST.id
      WHERE S.userId = '${userId}' AND S.studyDate >= ${weekStart} AND S.studyDate <= ${weekStart + 6}
      GROUP BY S.studyTagId, ST.studyTagLabel, ST.show
      ORDER BY S.studyTagId
    `);

    studyWeekTotal.map((data: any, index: number) => {
      let studyDatasets: StudyWeekChartType = {
        label: '',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: tagColor[index]
      };

      // タグ名のみを設定
      if (data.show != true) {
        studyDatasets.label = 'タグ未設定'
      } else {
        studyDatasets.label = data.Study as string
      };

      datasets.push(studyDatasets)
    })

    // 曜日ごとの学習時間を取得
    // 事前にタグ情報は設定済のため、タグ名に一致する情報のみを学習時間に設定する
    for(let i = 0; i < 7; i++) {
      const studyWeekCharts = await this.studyRepo.query(`
        SELECT
          ST.show,
          ST.studyTagLabel as Study,
          SUM(S.studyTime) AS time,
          SUM(S.studyMinute) AS minute
        FROM study AS S
        LEFT JOIN study_tag AS ST ON S.studyTagId = ST.id
        WHERE S.userId = '${userId}' AND S.studyDate = ${weekStart + i}
        GROUP BY S.studyTagId, ST.studyTagLabel, ST.show
        ORDER BY S.studyTagId
      `);

      // データが存在しない場合は曜日の学習時間に0を設定する
      if (studyWeekCharts.length == 0) {
        datasets.map((tags: StudyWeekChartType) => 
          tags.label != ''
          ? {
            ...tags,
            data: tags.data[i] = 0
          }
          : { ...tags }
        )
      } else {
        studyWeekCharts.map((data: any) => {
          // タグが設定されていないもしくはタグが非表示に設定されている場合はタグ未設定として扱う
          if (data.Study == null || data.show != true) {
            data.Study = 'タグ未設定'
          };

          // 時間に取りまとめする
          const totalTime: number = data.time + data.minute / 60;

          datasets.map((tags: StudyWeekChartType) => 
            tags.label === data.Study
              ? {
                ...tags,
                data: tags.data[i] = Number(totalTime)
              }
              : {
                ...tags
              }
          )
        })
      }
    }

    return datasets;
  }


  /**
   * 月刊の学習時間をタグ別に取得する
   * @param userId 
   * @param month 
   */
  public async readStudyMonthChart(userId: string, month: number): Promise<StudyMonthChartReturnType> {
    let labels: string[] = [];
    let monthChart: StudyMonthChartType[] = [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }];

    try {
      const monthStart = month * 100;
      const monthEnd = month* 100 + 99;
      const studies = await this.studyRepo.query(`
        SELECT
          ST.show,
          ST.studyTagLabel AS Label,
          SUM(S.studyTime) AS Time,
          SUM(S.studyMinute) AS Minute
        FROM study AS S
        LEFT JOIN  study_tag AS ST ON S.studyTagId = ST.id
        WHERE S.userId = '${userId}' AND studyDate >= ${monthStart} AND S.studyDate <= ${monthEnd}
        GROUP BY S.studyTagId, ST.studyTagLabel, ST.show
      `);

      // はじめにラベル名の配列を作成する
      studies.map((study: any, index: number) => {
        if (study.Label == null || !study.show) {
          labels.push('タグ未設定');
        } else {
          labels.push(study.Label);
        };
      })

      // 重複しているタグ名（タグ未設定）は削除する
      labels = labels.filter((value, index) => labels.indexOf(value) === index);

      //フィルタ後にタグ未設定のインデックス値を取得
      const noSettingTag: number = labels.indexOf('タグ未設定');

      // 学習時間と配色を設定する
      studies.map((study: any, index: number) => {

        const totalTime: number = Number(study.Time) + Number(study.Minute / 60)

        // タグ未設定の場合は加算する
        if (study.Label == null || !study.show) {
          // 現時点でタグ未設定の学習時間が登録されていない場合
          if (monthChart[0].data[noSettingTag] == undefined) {
            monthChart[0].data.push(totalTime);
            monthChart[0].backgroundColor.push(tagColor[index]);
            monthChart[0].borderColor.push(tagColor[index]);  
          } else {
            monthChart[0].data[noSettingTag] = monthChart[0].data[noSettingTag] + totalTime;
          }
        } else {
          monthChart[0].data.push(totalTime);
          monthChart[0].backgroundColor.push(tagColor[index]);
          monthChart[0].borderColor.push(tagColor[index]);
        }
      })
    } catch (e) {
      console.error(e);
    }

    return {
      labels,
      monthChart
    }
  };

  /**
   * @param {StudyType} study 学習情報
   * @returns {boolean} 成功ならtrue 失敗ならfalse
   */
  public async updateStudy(study: StudyType): Promise<boolean> {
    if (study == undefined) return false;

    try {
      await this.studyRepo.update({ studyId: study.studyId }, {
        studyYear: study.studyYear,
        studyDate: study.studyDate,
        studyTime: study.studyTime,
        studyMinute: study.studyMinute,
        studyTagId: study.studyTagId,
        studyContent: study.studyContent
      })

      // Studyテーブルの更新完了後に履歴テーブルに新しい履歴情報を追加する
      study.studyTime = study.studyTime * 100 + study.studyMinute;
      await this.studyHistoryRepo.insert({
        studyId: study.studyId,
        userId: study.userId,
        studyYear: study.studyYear,
        studyDate: study.studyDate,
        studyTime: study.studyTime,
        studyTagId: study.studyTagId,
        studyContent: study.studyContent,
        deletedFlg: ''
      })
    } catch (e) {
      console.error('学習の更新に失敗:', e);
      return false;
    }

    return true;
  }

  /**
   * 学習の削除を実施
   * @param {number} studyId 
   * @returns {boolean} 成功ならtrue 失敗ならfalse
   */
  public async deleteStudy(studyId: number): Promise<boolean> {
    if (studyId == 0) return false;

    try {
      // 原本となるstudyを検索して、履歴に必要な必須情報を取得する
      const study: Study | null = await this.studyRepo.findOne({
        where: {
          studyId: studyId
        }
      });

      const studyTimeAndMinutes = Number(study?.studyTime) * 100 + Number(study?.studyMinute);
      // 削除時点の情報を記録する履歴を作成する
      await this.studyHistoryRepo.insert({
        studyId: studyId,
        userId: study?.userId,
        deletedFlg: '1',
        studyYear: study?.studyYear,
        studyDate: study?.studyDate,
        studyTime: studyTimeAndMinutes,
        studyTagId: study?.studyTagId,
        studyContent: study?.studyContent
      })

      // 履歴情報の作成完了後、原本となるレコードを物理削除する
      await this.studyRepo
        .createQueryBuilder()
        .delete()
        .from(Study)
        .where('studyId = :studyId', { studyId: studyId })
        .execute()
      
    } catch (e) {
      console.error('学習の取消に失敗:', e);
      return false;
    }
    
    return true;
  }
}

export default new StudyModel;