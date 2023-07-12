const { Card } = require("../models/Card");
const { User } = require("../models/User");
const joi = require("joi");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const result = await Card.find({}).sort({ location: 1 });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting cards" });
    }
  },

  getItem: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string().required(),
      });
      const { error, value } = scheme.validate({ _id: req.params.id });
      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }
      const result = await Card.findOne({ _id: value._id });
      res.json(result);
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error get the card" });
    }
  },
  add: async function (req, res, next) {
    try {
      const scheme = joi.object({
        title: joi.string().required(),
        subtitle: joi.string().required(),
        description: joi.string().required(),
        phone: joi.number().required(),
        email: joi.string().required(),
        web: joi.allow(" "),
        imageUrl: joi.allow(" "),
        imageAlt: joi.allow(" "),
        state: joi.allow(" "),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        houseNumber: joi.number().required(),
        zip: joi.allow(" "),
      });
      const { error, value } = scheme.validate(req.body);
      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }
      value.userId = req.user.id;
      const newCard = new Card(value);
      const result = await newCard.save();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error add card" });
    }
  },

  delete: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string().required(),
      });
      const { error, value } = scheme.validate({ _id: req.params.id });
      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const deleted = await Card.findOne({ _id: value._id });

      await Card.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error delete card" });
    }
  },

  edit: async function (req, res, next) {
    try {
      const scheme = joi.object({
        title: joi.string().required(),
        subtitle: joi.string().required(),
        description: joi.string().required(),
        phone: joi.number().required(),
        email: joi.string().required(),
        web: joi.allow(""),
        imageUrl: joi.allow(""),
        imageAlt: joi.allow(""),
        state: joi.allow(""),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        houseNumber: joi.number().required(),
        zip: joi.allow(""),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const card = await Card.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        value
      );

      if (!card) return res.status(404).send("Given ID was not found.");

      const updated = await Card.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },
  getMyCards: async function (req, res, next) {
    try {
      const result = await Card.find({ userId: req.user.id }).sort({
        location: 1,
      });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting cards" });
    }
  },

  setFavorite: async function (req, res) {
    const cardId = req.params.id;
    const userId = req.user.id;

    try {
      const card = await Card.findById(cardId);
      const user = await User.findById(userId);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }
      const cardIndex = card.favorites.indexOf(userId);
      const userIndex = user.favorites.indexOf(cardId);
      if (cardIndex === -1) {
        // User has not favorited the card, add to favorites
        card.favorites.push(userId);
      } else {
        // User has already favorited the card, remove from favorites
        card.favorites.splice(cardIndex, 1);
      }
      if (userIndex === -1) {
        // User has not favorited the card, add to favorites
        user.favorites.push(cardId);
      } else {
        // User has already favorited the card, remove from favorites
        user.favorites.splice(userIndex, 1);
      }
      await card.save();
      await user.save();
      const { title } = card;
      return res.status(200).json({ title });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  getUserFavoriteCards: async function (req, res) {
    try {
      const user = await User.findById(req.user.id).populate("favorites");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const favoriteCards = user.favorites;
      return res.status(200).json({ favoriteCards });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
};
