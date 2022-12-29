import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      // unique:true
    },
    email: {
      type: String,
      require: true,
      max: 50,
      // unique: true,
    },
    password: {
      type: String,
      require: true,
      require: true,
      min: 6,
      // unique: true,
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      default: "",
    },
    city: {
      type: String,
      max: 50,
    },
    work: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
      default: "",
      max: 20,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
