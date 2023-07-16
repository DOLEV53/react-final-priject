const { User } = require("../models/User");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/dev");

// create jwt
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id, checked, admin) => {
  return jwt.sign({ id, checked, admin }, "myPrivateKey", {
    expiresIn: maxAge,
  });
};

module.exports = {
  login: async function (req, res, next) {
    const schema = joi.object({
      email: joi.string().required().min(6).max(256).email(),
      password: joi.string().required().min(6).max(1024),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(401).send("Unauthorized");
      return;
    }

    try {
      const user = await User.findOne({ email: value.email });
      if (!user) throw Error;
      const validPassword = await bcrypt.compare(value.password, user.password);
      if (!validPassword) throw "invalid password";

      const token = createToken(user._id, user.checked, user.isAdmin);
      //bloced user
      if (user) {
        user.loginAttempts = 0;
        await user.save();
      }
      res.json({
        token: token,
        id: user._id,
        email: user.email,
        fName: user.fName,
        isAdmin: user.isAdmin,
        checked: user.checked,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid data.");
    }
  },

  signup: async function (req, res, next) {
    const schema = joi.object({
      fName: joi.string().required(),
      mName: joi.allow(" "),
      lName: joi.string().required(),
      phone: joi.number().required(),
      email: joi.string().required(),
      password: joi.string().required(),
      imageUrl: joi.allow(" "),
      imageAlt: joi.allow(" "),
      state: joi.allow(" "),
      country: joi.string().required(),
      city: joi.string().required(),
      street: joi.string().required(),
      houseNumber: joi.number().required(),
      zip: joi.allow(" "),
      checked: joi.allow(" "),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).json({ error: "error sign up new user" });
      return;
    }

    try {
      const user = await User.findOne({ email: value.email });
      if (user) {
        return res.status(400).json({ error: "User already registered." });
      }

      const hash = await bcrypt.hash(value.password, 10);

      const token = createToken(value._id, value.checked, value.isAdmin);

      const newUser = new User({
        fName: value.fName,
        mName: value.mName,
        lName: value.lName,
        imageUrl: value.imageUrl,
        imageAlt: value.imageAlt,
        phone: value.phone,
        state: value.state,
        country: value.country,
        city: value.city,
        street: value.street,
        houseNumber: value.houseNumber,
        zip: value.zip,
        email: value.email,
        password: hash,
        checked: value.checked,
        token: token,
      });

      const result = await newUser.save();

      res.json(result);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: "error sign up new user" });
    }
  },
  getAllUsers: async function (req, res, next) {
    try {
      const result = await User.find({}).sort({ location: 1 });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting users" });
    }
  },
  getUser: async function (req, res, next) {
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
      const result = await User.findOne({ _id: value._id }).select("-password");
      res.json(result);
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error get the user" });
    }
  },
  editUser: async function (req, res, next) {
    try {
      const scheme = joi.object({
        fName: joi.string().required(),
        mName: joi.allow(" "),
        lName: joi.string().required(),
        phone: joi.number().required(),
        email: joi.string().required(),
        password: joi.string(),
        imageUrl: joi.allow(" "),
        imageAlt: joi.allow(" "),
        state: joi.allow(" "),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        houseNumber: joi.number().required(),
        zip: joi.allow(" "),
        checked: joi.allow(" "),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        value
      );

      if (!user) return res.status(404).send("Given ID was not found.");

      const updated = await User.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },
  editUserBussiness: async function (req, res, next) {
    try {
      const scheme = joi.object({
        checked: joi.boolean(),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        value,
        { runValidators: false }
      );

      if (!user) return res.status(404).send("Given ID was not found.");

      const updated = await User.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },
  deleteUser: async function (req, res, next) {
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

      const deleted = await User.findOne({ _id: value._id });

      await User.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error delete user" });
    }
  },
  // blocked user
  blockedUser: async function (req, res, next) {
    try {
      console.log(req.body);
      const userEmail = req.body.email;
      const user = await User.findOne({ email: userEmail });
      console.log(user);
      if (!user) {
        return res
          .status(401)
          .json({ status: "fail", message: "Invalid credentials" });
      }
      if (user.blocked) {
        return res
          .status(403)
          .json({ status: "fail", message: "User is blocked" });
      }
      if (user.loginAttempts >= 3) {
        // Block the user
        user.blocked = true;
        await user.save();

        return res.status(403).json({
          status: "fail",
          message: "Too many login attempts. User blocked",
        });
      }
      user.loginAttempts++;
      await user.save();
      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
