const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
  },
  mName: {
    type: String,
  },
  lName: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  state: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageAlt: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  street: {
    type: String,
    require: true,
  },
  houseNumber: {
    type: Number,
    require: true,
  },
  zip: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  loginAttempts: {
    type: Number,
    default: 0,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
