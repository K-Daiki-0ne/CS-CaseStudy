import { ObjectType, Field, Mutation, Arg, Resolver, InputType, Query } from 'type-graphql';
import { Study } from '../entity';
import StudyModel from '../models/study';
import { formatDate, formatTime } from '../libs/formatDateAndTime';

@InputType()
class StudyInput {
  @Field({ nullable: true })
  studyId?: number;

  @Field()
  userId: string;

  @Field()
  studyYear: number;

  @Field()
  studyDate: number;

  @Field()
  studyTime: number;

  @Field({ nullable: true })
  studyTagId?: number;

  @Field({ nullable: true })
  studyContent?: string;
}

@ObjectType()
class StudyMultiObjectType {
  @Field()
  studyId: number;

  @Field()
  userId: string;

  @Field()
  tagId: number;

  @Field()
  Study: string;

  @Field()
  Date: string;

  @Field()
  Time: string;

  @Field()
  Content: string
}

@ObjectType()
class StudyMultiResponse {
  @Field(() => [StudyMultiObjectType], { nullable: true })
  studies?: StudyMultiObjectType[];
}

type ResStudiesType = {
  studyId: number;
  userId: string;
  tagId: number;
  Study: string;
  Date: string;
  Time: string;
  Content: string;
}

@Resolver(Study)
export class StudyResolver {

  @Mutation(() => Boolean)
  async createStudy(
    @Arg('inputStudy') study: StudyInput
  ): Promise<Boolean> {
    const isSuccess: boolean = await StudyModel.createStudy(study);

    console.log('isSuccess:', isSuccess)

    if (!isSuccess) {
      return false
    }

    return true;
  }

  @Query(() => Study)
  async singleReadStudy(
    @Arg('id') id: number
  ): Promise<Study | null> {
    //データ取得回避を減らすためにタグ情報は随時取得しない
    return await StudyModel.readSingleStudy(id);
  }

  @Query(() => StudyMultiResponse)
  async multiReadStudy(
    @Arg('usreId') userId: string
  ): Promise<StudyMultiResponse> {

    //データ取得回避を減らすためにタグ情報は随時取得しない
    const studies = await StudyModel.readStudy(userId);

    if (studies.length == 0) {
      return {
        studies: []
      };
    }
    
    const resStudies: ResStudiesType[]  = []

    // フロントで使用できるようデータ内容を変更する
    studies.map((data: any) => {
      const setValue: ResStudiesType = {
        studyId: data.studyId,
        userId: data.userId,
        tagId: data.tagId,
        Study: data.Study,
        Date: formatDate(data.Date),
        Time: formatTime(data.Time),
        Content: data.Content
      }
      resStudies.push(setValue);
    })

    return {
      studies: resStudies
    }
  }

  @Mutation(() => Boolean)
  async updateStudy(
    @Arg('updateStudy') study: StudyInput
  ): Promise<boolean> {

    /* 
     * 更新処理でデータ不整合による異常終了は発生しないが、
     * ORMとDBの異常終了などを考慮して、エラー発生時はフロント側でエラーページにリダイレクトする
     */
    return await StudyModel.updateStudy(study);
  }

  @Mutation(() => Boolean)
  async deleteStudy(@Arg('studyId') studyId: number) {
    return await StudyModel.deleteStudy(studyId)
  }
}