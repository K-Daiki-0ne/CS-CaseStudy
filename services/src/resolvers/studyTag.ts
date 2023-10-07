import { Mutation, Arg, Resolver, Query } from 'type-graphql';
import { StudyTag } from '../entity';
import StudyTagModel from '../models/studyTag';

@Resolver(StudyTag)
export class StudyTagResolver {
  
  @Query(() => [StudyTag])
  async readTags(@Arg('user') userId: string): Promise<StudyTag[]> {
    return await StudyTagModel.readMultiStudyTag(userId);
  }

  @Mutation(() => Boolean)
  async createStudyTag(
    @Arg('userId') userId: string,
    @Arg('key') key: string,
    @Arg('label') label: string
  ) {
    return  await StudyTagModel.createTag(userId, key, label);
  }

  @Mutation(() => Boolean)
  async updateStudyTag(
    @Arg('userId') userId: string,
    @Arg('key') key: string,
    @Arg('label') label: string,
    @Arg('show') show: boolean
  ): Promise<boolean> {
    return await StudyTagModel.updateStudyTag(userId, key, label, show);
  }

  @Mutation(() => Boolean)
  async deleteStudyTag(@Arg('id') id: number) {
    return await StudyTagModel.deleteStudyTag(id);
  }
}