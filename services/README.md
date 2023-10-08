# Services(バックエンド)

**開発環境**

- nodejs( v20.7.0 )
- typesctipt( v4.5.2 )
- express( v4.17.1 )
- apollo-server-express( v2.16.1 )
- typeorm( v0.3.11 )
- type-graphql( v1.1.1 )
- graphql( v15.3.0 )

### 起動
MySQLが開発環境にインストールされていることを確認してください。

以下のデータベース名やユーザーネームを自身で作成した内容に変更してください。

``` ts:src/config/data-source.ts
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: 'admin',
  password: 'casestudy',
  database: 'casestudy',
  synchronize: false,
  logging: false,
  entities: [User, StudyTag, Study, StudyHistory],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
})
```

``` bash
# npm
npm install

npm start

# npm
yarn

yarn start
```

``` bash
yarn typeorm migration:generate src/migration/migration -d src/config/data-source.ts

yarn typeorm migration:run -d src/config/data-source.ts
```


### 仕様
バックエンドはGraphql Serverとして活用。

主たる目的はデータを転送してDBに保存をする。

保存したDBを抽出して、APIとして結果を転送する。

### 構成

- config
  > データベースの設定内容

- entity
  > テーブルのカラム

- model
  > DTA DAOを担当

- resolver
  > GraphQLのquery mutationを担当
