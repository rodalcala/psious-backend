const User = require('./model');

exports.getAll = async (ctx) => {
  const allUsersData = await User.find({});

  console.log('allUsersData', allUsersData)

  ctx.status = 200;
  ctx.body = {
    error_code: 0,
    data: allUsersData,
  };
};

exports.createToDo = async (ctx) => {
  const {
    text,
    priority,
  } = ctx.request.body;

  let { user } = ctx.params;

  const item = {
    text,
    priority,
    completed: false,
    createdAt: Date.now(),
  }

  const existingUser = await User.findOne({ name: user });

  if (!existingUser) {
    User.create({
      name: user,
      todos: [ item ],
    })
  } else {
    existingUser.todos.push(item);
    User.findOneAndUpdate({ name: user }, { todos: [...existingUser.todos] }, err => {
      if (err) console.log('Error creating a new item:', err);
    })
  }
};

exports.completeToDo = async (ctx, next) => {
  
};

exports.deleteToDO = async (ctx, next) => {
  
};
