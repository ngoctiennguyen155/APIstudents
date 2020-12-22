const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const Student = new Schema({
  name :String,
  age : Number,
  email:String,
  password:String
},
{ timestamps: true }
);

module.exports = mongoose.model('Student', Student);