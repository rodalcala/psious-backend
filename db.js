// Retrieve
const mongoose = require('mongoose');

const port = 27017;
const db = mongoose.connection;
const url = `mongodb://psious-db:${port}/psious-db`;

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

// Connect to the db
db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line
db.once('open', () => {
  console.log(`Connected to the database on port ${port}.`) // eslint-disable-line
});

module.exports = db;
