import { ObjectType, Field, Mutation, Arg, Resolver, InputType, Query } from 'type-graphql';
import { Study } from '../entity';
import StudyModel from '../models/study';
import { formatDate, searchWeekStartEnd } from '../libs/dateFormat';

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

  @Field()
  studyMinute: number;
  
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

@ObjectType()
class StudyTimeResponse {
  @Field(() => StudyTimeType)
  day: StudyTimeType;

  @Field(() => StudyTimeType)
  week: StudyTimeType;

  @Field(() => StudyTimeType)
  month: StudyTimeType;
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

@ObjectType()
class StudyTimeType {

  @Field()
  time: number;

  @Field()
  minute: number
}


@Resolver(Study)
export class StudyResolver {

  @Mutation(() => Boolean)
  async createStudy(
    @Arg('inputStudy') study: StudyInput
  ): Promise<Boolean> {
    const isSuccess: boolean = await StudyModel.createStudy(study);

    if (!isSuccess) {
      return false
    }

    return true;
  }

  @Query(() => StudyTimeResponse)
  async readStudyTime(
    @Arg('userId') userId: string,
    @Arg('date') date: number
  ): Promise<StudyTimeResponse> {
    const day = await StudyModel.readDayOfStudyTime(userId, date);
    const week = await StudyModel.readWeekOfStudyTime(
      userId,
      searchWeekStartEnd(date).startWeekDay, 
      searchWeekStartEnd(date).endWeekDay
    );

    const month = await StudyModel.readMonthOfStudyTime(userId, Math.floor(date / 100));

    return {
      day,
      week,
      month
    }
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
    @Arg('userId') userId: string
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
      let minute = 0;
      if (data.Minute != undefined) {
        minute = data.Minute
      };
      const setValue: ResStudiesType = {
        studyId: data.studyId,
        userId: data.userId,
        tagId: data.tagId,
        Study: data.Study,
        Date: formatDate(data.Date),
        Time: String(data.Time) + '時間' + String(minute) + '分',
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