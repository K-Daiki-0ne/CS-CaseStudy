import 'reflect-metadata';
import Express from 'express';
import { initialize } from './config/data-source';

const main = async () => {
    const app = Express();

    initialize();

    app.listen(4000, () => console.log('Server listning ...OK'));
};

main().catch((err) => {
    console.log('Server listning ...NO');
    console.error(err);
});