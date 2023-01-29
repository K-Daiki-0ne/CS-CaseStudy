import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
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
