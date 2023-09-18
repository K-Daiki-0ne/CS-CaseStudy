import { GraphQLSchema, graphql } from 'graphql';
import { buildSchema } from 'type-graphql';
import { StudyTagResolver } from '../resolvers';
import { AppDataSource } from '../config/data-source';

beforeAll(async() => {
  await AppDataSource.initialize();
});

afterAll(async() => {
  await AppDataSource.destroy();
});

describe('StudyTagResolver', () => {
  it('read', async () => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [StudyTagResolver],
      validate: true,
    });

    const query: string = `
      query {
        readTags(user: "6584aba9-495f-42bd-bfea-5bf2b68b92d9") {
          userId
        }
      }
    `;

    const result = await graphql({ schema, source: query });

    expect(result.data).toMatchObject({
      readTags: [{
        userId: '6584aba9-495f-42bd-bfea-5bf2b68b92d9'
      }]
    })
  });

  it('create', async() => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [StudyTagResolver],
      validate: true,
    });

    const mutation: string = `
      mutation {
        createStudyTag(userId: "6584aba9-495f-42bd-bfea-5bf2b68b92d9", tagKey: "10", tagLabel: "test")
      }
    `;

    const result = await graphql({ schema, source: mutation });
    expect(result.data).toMatchObject({
      createStudyTag: true
    })
  });

  it('delete', async() => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [StudyTagResolver],
      validate: true,
    });

    const mutation: string = `
      mutation {
        deleteStudyTag(id:1)
      }
    `;

    const result = await graphql({ schema, source: mutation });
    expect(result.data).toMatchObject({
      deleteStudyTag: true
    })
  })
})