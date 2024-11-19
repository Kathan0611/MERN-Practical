const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    First_Name: {
    type: String,
    required: true,
    },
    Last_Name:{
    type:String,
    required:true,
    },
    Email:{
    type:String,
    required:true
    },
    Profile_Picture:{
    type:String,
    },
    Birthdate:{
     type:Date
    },
    Phone_Number:{
      type:Number
    },
    Password:{
       type:String
    }
},{
    timestampes:true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
