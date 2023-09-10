import { AppDataSource } from '../config/data-source';
import { Study, StudyHistory } from '../entity';
import { Repository } from 'typeorm'

type StudyType = {
  studyId?: number;
  userId: string;
  studyYear: number;
  studyDate: number;
  studyTime: number;
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
        studyTagId: study.studyTagId,
        studyContent: study.studyContent
      })

      const postStudy = await this.studyRepo
        .createQueryBuilder('study')
        .select('study')
        .from(Study, 'study')
        .where('study.userId = :userId', { userId: study.userId })
        .orderBy('study.studyId', 'DESC')
        .getOne()
      
      if (postStudy == null) {
        console.error('最新の学習情報の取得に失敗')
        return false
      }
      
      await this.studyHistoryRepo.insert({
        studyId: postStudy?.studyId,
        userId: study.userId,
        deletedFlg: ' ',
        studyYear: study.studyYear,
        studyDate: study.studyDate,
        studyTime: study.studyTime,
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

  public async readStudy(userId: string): Promise<Study[]> {
    if (userId == '') return [];

    const studies: Study[] = await this.studyRepo.find({
      where: {
        userId: userId
      }
    })

    return studies;
  }

  public async updateStudy(study: StudyType) {
    if (study == undefined) return false;

    try {
      await this.studyRepo.update({ studyId: study.studyId }, {
        studyYear: study.studyYear,
        studyDate: study.studyDate,
        studyTime: study.studyTime,
        studyTagId: study.studyTagId,
        studyContent: study.studyContent
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
      // Studyテーブルからデータを物理削除する
      await this.studyRepo
        .createQueryBuilder('study')
        .delete()
        .from(Study)
        .where('studyId = :studyId', { studyId: studyId })
        .execute()
      
      // Studyテーブルの削除完了後、履歴テーブルを論理削除する
      await this.studyHistoryRepo.update( {studyId: studyId }, {
        deletedFlg: '1'
      })
    } catch (e) {
      console.error('学習の取消に失敗:', e);
      return false;
    }
    
    return true;
  }
}

export default new StudyModel;