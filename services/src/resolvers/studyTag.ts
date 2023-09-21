import { Mutation, Arg, Resolver, Query, InputType, Field } from 'type-graphql';
import { StudyTag } from '../entity';
import StudyTagModel from '../models/stydyTag';

@InputType()
class StudyTags {
  @Field()
  key: string;
  
  @Field()
  label: string;
  
  @Field({ nullable: true })
  show?: boolean
}

@InputType()
class StudyTagRequest {
  @Field(() => [StudyTags], { nullable: true })
  studyTags: StudyTags[]
}

@Resolver(StudyTag)
export class StudyTagResolver {
  
  @Query(() => [StudyTag])
  async readTags(@Arg('user') userId: string): Promise<StudyTag[]> {
    return await StudyTagModel.readMultiStudyTag(userId);
  }

  @Mutation(() => Boolean)
  async createStudyTag(
    @Arg('userId') userId: string,
    @Arg('studyTags') studyTags: StudyTagRequest
  ) {
    console.log('userId:', userId);
    console.log('studyTags:', studyTags);
    // return  await StudyTagModel.createTag(userId, tagKey, tagLabel);
    return true
  }


  @Mutation(() => Boolean)
  async deleteStudyTag(@Arg('id') id: number) {
    return await StudyTagModel.deleteStudyTag(id);
  }
}