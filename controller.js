const Item = require('./model');

exports.getAll = async (ctx) => {
  const allItems = await Item.find({});
  const allItemsByUser = {};

  allItems.forEach((item) => {
    if (allItemsByUser[item.owner]) {
      allItemsByUser[item.owner].push(item);
    } else {
      allItemsByUser[item.owner] = [item];
    }
  });

  ctx.status = 200;
  ctx.body = {
    error_code: 0,
    message: allItemsByUser,
  };
};

exports.createToDo = async (ctx) => {
  const { text } = ctx.request.body;
  const { user } = ctx.params;

  Item.create({
    owner: user,
    text,
    completed: false,
    created_at: Date.now(),
  });

  ctx.status = 200;
  ctx.body = {
    error_code: 0,
    message: 'item created',
  };
};

exports.completeToDo = async (ctx) => {
  const { id } = ctx.params;

  await Item.findByIdAndUpdate(id, { completed: true });

  ctx.status = 200;
  ctx.body = {
    error_code: 0,
    message: 'item completed',
  };
};

exports.deleteToDO = async (ctx) => {
  const { id } = ctx.params;

  await Item.findByIdAndRemove(id);

  ctx.status = 200;
  ctx.body = {
    error_code: 0,
    message: 'item deleted',
  };
};
