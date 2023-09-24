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

  @Field(() => StudyTimeType)
  day: StudyTimeType;

  @Field(() => StudyTimeType)
  week: StudyTimeType;

  @Field(() => StudyTimeType)
  month: StudyTimeType;

  @Field(() => [StudyWeekChart])
  weekChart: StudyWeekChart[];

  @Field(() => [String])
  labels: String[]

  @Field(() => [StudyMonthChart])
  monthChart: StudyMonthChart[]
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


@ObjectType()
class StudyWeekChart {
  @Field()
  label: string;

  @Field(() => [Number])
  data: Number[];

  @Field()
  backgroundColor: string;
}

@ObjectType()
class StudyMonthChart {

  @Field(() => [Number])
  data: Number[];

  @Field(() => [String])
  backgroundColor: string[];

  @Field(() => [String])
  borderColor: string[];

  @Field()
  borderWidth: 1
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


  @Query(() => Boolean)
  async readStudyChart(
    @Arg('userId') userId: string,
    @Arg('today') today: number
  ): Promise<boolean> {



    return true
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
    @Arg('userId') userId: string,
    @Arg('date') date: number
  ): Promise<StudyMultiResponse> {

    //データ取得回避を減らすためにタグ情報は随時取得しない
    const studies = await StudyModel.readStudy(userId);

    if (studies.length == 0) {
      return {
        studies: [],
        day: {
          time: 0,
          minute: 0
        },
        week: {
          time: 0,
          minute: 0,
        },
        month: {
          time: 0,
          minute: 0
        },
        weekChart: [],
        labels: [],
        monthChart: []
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
        tagId: data.tagId != null ? data.tagId : 0,
        Study: data.Study != null ? data.Study : '',
        Date: formatDate(data.Date),
        Time: String(data.Time) + '時間' + String(minute) + '分',
        Content: data.Content
      }
      resStudies.push(setValue);
    })

    const day = await StudyModel.readDayOfStudyTime(userId, date);
    const week = await StudyModel.readWeekOfStudyTime(
      userId,
      searchWeekStartEnd(date).startWeekDay, 
      searchWeekStartEnd(date).endWeekDay
    );

    const month = await StudyModel.readMonthOfStudyTime(userId, Math.floor(date / 100));

    const weekChart = await StudyModel.readStudyWeekChart(userId, searchWeekStartEnd(date).startWeekDay);
    console.log(weekChart)

    return {
      studies: resStudies,
      day,
      week,
      month,
      weekChart: [],
      labels: [],
      monthChart: []
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