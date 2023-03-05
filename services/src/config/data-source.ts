import "reflect-metadata"
import { DataSource } from "typeorm";
import {DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSEORD, DATABASE_DATABASE} from '../utils/constant';
import { User, StudyCategory, StudyComment, StudyHistory, UserProfession } from "../entity"

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    username: DATABASE_USERNAME,
    password: DATABASE_PASSEORD,
    database: DATABASE_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User,StudyCategory,StudyComment,StudyHistory,UserProfession],
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
