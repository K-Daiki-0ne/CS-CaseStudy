import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { StudyTag } from '../entity';

class StudyTagModel {
  private studyTag: Repository<StudyTag>

  constructor() {
    this.studyTag = AppDataSource.getRepository(StudyTag);
  }

  public async createTag(key: string, label: string) {
    if (key == '' && label == '') return false;

    try {
      await this.studyTag.insert({
        studyTagKey: key,
        studyTagLabel: label
      })  
    } catch(e) {
      console.error('タグの登録に失敗:', e);
      return false;
    }
    return true;
  }


  public async readSingleStudyTag(id: number) {
    try {
      const studyTag = await this.studyTag.findOne({
        where: {
          id: id
        }
      });
      return studyTag;
    } catch (e) {
      console.error('タグの単一検索に失敗:', e);
      return
    }
  }

  public async readMultiStudyTag(userId: string) {
    try {
      const studyTags = await this.studyTag.find({
        where: {
          userId: userId
        }
      })

      return studyTags;
    } catch (e) {
      console.error('タグの複数検索に失敗:', e)
      return;
    }
  }

  public async deleteStudyTag(id: number) {
    // 過去のデータを参照することができるように物理削除ではなく、論理削除にする
    try {
      await this.studyTag.update({ id: id }, {
        show: false
      })
    } catch (e) {
      console.error('タグの取消に失敗:', e);
      return false;
    }

    return true;
  }
}

export default new StudyTagModel;