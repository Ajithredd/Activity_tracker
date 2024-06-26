// models/TimeLimit.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeLimitSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  hostname: { type: String, required: true },
  timeLimit: { type: Number, required: true }
});

module.exports = mongoose.model('TimeLimit', TimeLimitSchema);
