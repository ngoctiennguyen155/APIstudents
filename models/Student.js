const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const Student = new Schema({
  name :String,
  age : Number,
  email:String,
  address:String,
  height:String,
  weight:String,
  graduating:Boolean,
  informations:{
    mother:String,
    father:String,
    girlpriend:String,
    ex:[{name:String}]    
  },
  marks:[
        {maths:Number,
        physical:Number,
        chemical:Number,
        english:Number,
        Literature:Number,
        history:Number,
        geography:Number}
    ],
  avg:String
});

module.exports = mongoose.model('Student', Student);