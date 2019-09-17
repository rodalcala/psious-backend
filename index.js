require('./db');

const Koa = require('koa');
const app = new Koa();
const port = 4000;

const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});