import { AppDataSource } from '../config/data-source';
import { Study, StudyHistory } from '../entity';
import { Repository } from 'typeorm'

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

      console.log('model studies:', studies)
      // 返却するデータ内容を編集する。
      return studies;
    } catch (e) {
      console.error('readStudy:', e);
    }
  }

  public async updateStudy(study: StudyType) {
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

  public async deleteStudy(studyId: number) {
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