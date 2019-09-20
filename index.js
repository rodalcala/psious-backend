require('./db');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

const Item = require('./model');

const connection = (socket) => {
  // eslint-disable-next-line no-console
  console.log(`A user with socket ${socket.id} has entered.`);

  const sendUsersItems = async ({ user }) => {
    const usersItems = await Item.find({ owner: user });
    io.in(user).emit('updateList', { usersItems });
  };
  const joinRoomAndUpdateItems = async ({ user }) => {
    socket.join(user);
    const usersItems = await Item.find({ owner: user });
    io.in(user).emit('updateList', { usersItems });
  };


  /* NOTE: All events listed below will trigger an update of the to-do's list */
  socket.on('updateRequired', sendUsersItems);
  socket.on('userSubmitted', joinRoomAndUpdateItems);
};

io.on('connection', connection);

const port = 4000;
const router = require('./router');

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}.`);
});
