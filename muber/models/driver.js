const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: boolean,
    default: false,
  },
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
