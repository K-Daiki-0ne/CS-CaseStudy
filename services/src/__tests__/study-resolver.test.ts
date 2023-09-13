import { GraphQLSchema, graphql } from 'graphql';
import { buildSchema } from 'type-graphql';
import { StudyResolver } from '../resolvers';
import { AppDataSource } from '../config/data-source';

beforeAll(async() => {
  await AppDataSource.initialize();
});

afterAll(async() => {
  await AppDataSource.destroy();
});


describe('StudyRepository', () => {
  it('create-study', async () => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [StudyResolver],
      validate: true,
    });

    let mutation: string = `
      mutation {
        createStudy(inputStudy: {
          userId: "268a6841-62c0-4721-a278-98473331d3b7",
          studyYear: 2023,
          studyDate: 20230911,
          studyTime: 130,
          studyTagId: 3,
          studyContent: "学習テスト"
        })
      }
    `;

    let success = await graphql({ schema, source: mutation });

    expect(success.data).toMatchObject({
      createStudy: true
    });

    mutation = `
      mutation {
        createStudy(inputStudy: {
          userId: "1",
          studyYear: 2023,
          studyDate: 20230911,
          studyTime: 130,
          studyTagId: 3,
          studyContent: "学習テスト"
        })
      }
    `;

    success = await graphql({ schema, source: mutation });
    expect(success.data).toMatchObject({
      createStudy: false
    });
  });

  it('update-study', async () => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [StudyResolver],
      validate: true,
    });

    let mutation: string = `
      mutation {
        updateStudy(updateStudy: {
          studyId: 7,
          userId: "268a6841-62c0-4721-a278-98473331d3b7",
          studyYear:2024,
          studyDate:20230912,
          studyTime:1000,
          studyTagId:11,
          studyContent:"学習内容の更新"    
        })
      }
    `;

    let success = await graphql({ schema, source: mutation });
    expect(success.data).toMatchObject({
      updateStudy: true
    });

    mutation = `
      mutation {
        updateStudy(updateStudy: {
          studyId: 9999999,
          userId: "268a6841-62c0-4721-a278-98473331d3b7",
          studyYear:2024,
          studyDate:20230912,
          studyTime:1000,
          studyTagId:11,
          studyContent:"学習内容の更新"    
        })
      }
    `;

    success = await graphql({ schema, source: mutation });
    expect(success.data).toMatchObject({
      updateStudy: false
    });
  })

  it('read-study', async() => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [StudyResolver],
      validate: true,
    });

    let query: string = `
      query {
        singleReadStudy(id: 1) {
          studyId,
        }
      }
    `;

    const study = await graphql({ schema, source: query });
    expect(study.data).toMatchObject({
      singleReadStudy: {
        studyId: 1
      }
    });
  })
})