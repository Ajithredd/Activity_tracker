// models/Activity.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  hostname: { type: String, required: true },
  path: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  // Duration in seconds
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);
