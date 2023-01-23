import Express from 'express';

const main = async () => {
  const app = Express();
  const PORT:Number = 4000;

  app.listen(PORT, () => console.log('Server listning ...OK'));
}

main().catch((err) => {
  console.log('Server listning ...NO');
  console.error(err);
})