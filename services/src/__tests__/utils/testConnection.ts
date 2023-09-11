import { DataSource } from "typeorm";

export const testDBConnection = ( drop: boolean ) => {
  return new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'casestudy_test',
    synchronize: drop,
    logging: drop,
    entities: [__dirname + '../../entity/*.*'],  
  })
}