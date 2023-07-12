const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
  subtitle: {
    type: String,
    require: true,
  },
  description: {
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
  web: {
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
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Card = mongoose.model("Card", cardSchema);

exports.Card = Card;
