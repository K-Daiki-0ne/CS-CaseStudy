import 'reflect-metadata';
import Express from 'express';

const main = async () => {
    const app = Express();
    app.listen(() => console.log('Server listning ...OK'));
};

main().catch((err) => {
    console.log('Server listning ...NO');
    console.error(err);
});