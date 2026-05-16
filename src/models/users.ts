import mongoose from "mongoose";

//Schema

const userSchema = new mongoose.Schema({
  first_name : {
    type : String,
    required : true,
  },

  last_name : {
    type : String,
    required : true,
  },

  email : {
    type : String,
    required : true,
    unique : true,
  },

  gender : {
    type : String,
    required : true,
  },

  job_title : {
    type : String,
    required : true
  }
}, {timestamps : true});

export const User = mongoose.model('user', userSchema);