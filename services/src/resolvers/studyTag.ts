import { Mutation, Arg, Resolver, Query } from 'type-graphql';
import { StudyTag } from '../entity';
import StudyTagModel from '../models/stydyTag';

@Resolver(StudyTag)
export class StudyTagResolver {
  
  @Query(() => [StudyTag])
  async readTags(@Arg('user') userId: string): Promise<StudyTag[]> {
    return await StudyTagModel.readMultiStudyTag(userId);
  }

  @Mutation(() => Boolean)
  async createStudyTag(
    @Arg('userId') userId: string,
    @Arg('tagKey') tagKey: string,
    @Arg('tagLabel') tagLabel: string
  ) {
    return  await StudyTagModel.createTag(userId, tagKey, tagLabel);
  }


  @Mutation(() => Boolean)
  async deleteStudyTag(@Arg('id') id: number) {
    return await StudyTagModel.deleteStudyTag(id);
  }
}