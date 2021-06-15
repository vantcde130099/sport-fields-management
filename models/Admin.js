const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  password: { type: String },
  fields: [Schema.Types.ObjectId],
  coaches: [Schema.Types.ObjectId],
  orders: [Schema.Types.ObjectId],
});

module.exports = Admin = mongoose.model('admin', AdminSchema);
