const mongoose = require('mongoose');
const { userSchema } = require('../config/database');

module.exports = mongoose.model('User', userSchema);
