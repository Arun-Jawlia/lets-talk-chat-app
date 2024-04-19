const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: "String",
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  setFriendRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
