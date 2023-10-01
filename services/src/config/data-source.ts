import "reflect-metadata"
import { DataSource } from "typeorm";
import { User, Study, StudyTag, StudyHistory } from "../entity"

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

export const initialize = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('database connection ...OK');
    })
    .catch((err) => {
      console.log('database connection ...NO');
      console.error(err);
    })
}
