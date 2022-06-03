const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://tenzin:123@cluster0.532puew.mongodb.net/sheyrooms';

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on('error', () => console.log('connection error:'));
connection.on('connected', () => console.log('connected to database'));

module.exports = mongoose;
