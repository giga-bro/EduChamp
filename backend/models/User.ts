// @ts-nocheck
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    profilePicPath:{
      type: String,
      required: false,
    },
    bio:{
      type: String,
      required: false,
    },
    backgroundPicPath:{
      type: String,
      required: false,
    },
    provider:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema, 'Users');

export default User;
