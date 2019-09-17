const Item = require('./model');

exports.getAll = async (ctx) => {
  const allItems = await Item.find({});

  ctx.status = 200;
  ctx.body = {
    error_code: 0,
    message: allItems,
  };
};

exports.createToDo = async (ctx) => {
  const { text, priority } = ctx.request.body;
  const { user } = ctx.params;

  Item.create({
    owner: user,
    text,
    priority,
    completed: false,
    created_at: Date.now(),
  });

  ctx.status = 200;
  ctx.body = {
    error_code: 0,
    message: 'item created',
  };
};

exports.completeToDo = async (ctx, next) => {
  let { user } = ctx.request.body;
  let { createdAt } = ctx.params;
  
  const existingUser = await Item.findOne({ name: user });

};

exports.deleteToDO = async (ctx, next) => {
  
};
