import "reflect-metadata"
import { DataSource } from "typeorm";
import { User, Study, StudyCategory, StudyHistory } from "../entity"

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'casestudy',
    database: 'casestudy',
    entities: [User, StudyCategory, Study, StudyHistory],
    migrations: ["migration/*.ts"],
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
