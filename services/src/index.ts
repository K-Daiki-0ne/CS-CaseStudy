import 'reflect-metadata';
import Express from 'express';
import { readEnviroment } from './utils/constant';
import { initialize } from './config/data-source';

const main = async () => {
    const app = Express();
    initialize();
    readEnviroment();
    app.listen(() => console.log('Server listning ...OK'));
};

main().catch((err) => {
    console.log('Server listning ...NO');
    console.error(err);
});