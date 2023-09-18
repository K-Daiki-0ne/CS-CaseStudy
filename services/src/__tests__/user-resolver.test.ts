import { GraphQLSchema, graphql } from 'graphql';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers';
import { AppDataSource } from '../config/data-source';

beforeAll(async() => {
  await AppDataSource.initialize();
});

afterAll(async() => {
  await AppDataSource.destroy();
});

describe('UserResolver', () => {
  it('login-user', async () => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [UserResolver],
      validate: true,
    });

    let query: string = ''

    // テスト実施前にテスト用のデータを作成する
    query = ` query {
      login(email: "sample2@sample.com", password: "test2" ) {
        user {
          email,
        }
      }
    }`;

    let user = await graphql({ schema, source: query });

    // resolverのテストを実施（ダミーデータのため、必ず取得できる）
    expect(user.data).toMatchObject({
      login: {
        user: {
          email: 'sample2@sample.com'
        }
      }
    })

    // エラーテスト(emailが存在しない場合)
    query = ` query {
      login(email: "sample3@sample.com", password: "test2" ) {
        errors {
          field,
          message
        }
      }
    }`;


    user = await graphql({ schema, source: query });

    expect(user.data).toMatchObject({
      login: {
        errors: [{
          field: 'email',
          message: '入力されたemailが存在しません'
        }]
      }
    })

    // エラーテスト(emailが存在しない場合)
    query = ` query {
      login(email: "sample2@sample.com", password: "test3" ) {
        errors {
          field,
          message
        }
      }
    }`;

    user = await graphql({ schema, source: query });
    expect(user.data).toMatchObject({
      login: {
        errors: [{
          field: 'password',
          message: 'パスワードに誤りがあります'
        }]
      }
    })
  });

  it('create-user', async () => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [UserResolver],
      validate: true,
    });

    let mutation: string = `
      mutation {
        createUser(email: "sample5@sample.com")
      }
    `;

    const result = await graphql({ schema, source: mutation });

    // 正常に終了した場合
    expect(result.data).toMatchObject({
      createUser: true
    })
  })

  it('update-user', async() => {
    let schema: GraphQLSchema = await buildSchema({
      resolvers: [UserResolver],
      validate: true,
    });

    let mutation: string = `
      mutation {
        register(user: {
          userId: "6584aba9-495f-42bd-bfea-5bf2b68b92d9",
          userName: "テスト2",
          password: "test2",
          professionId: "11"      
        }) {
          user {
            userName,
          }
      }
    `;

    const result = await graphql({ schema, source: mutation });
    expect(result.data).toMatchObject({
      register: {
        user: {
          userName: 'テスト2'
        }
      }
    })
  })
})