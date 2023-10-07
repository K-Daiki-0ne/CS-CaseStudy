# Services(バックエンド)

**開発環境**

- nodejs( v20.7.0 )
- typesctipt( v4.5.2 )
- express( v4.17.1 )
- apollo-server-express( v2.16.1 )
- typeorm( v0.3.11 )
- type-graphql( v1.1.1 )
- graphql( v15.3.0 )

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

- 