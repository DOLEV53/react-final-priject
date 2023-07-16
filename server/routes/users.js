var express = require("express");
var router = express.Router();
const users = require("../controllers/users");

router.post("/signup", users.signup);
router.post("/login", users.blockedUser, users.login);

router.get("/", users.getAllUsers);
router.patch("/bussines/:id", users.editUserBussiness);
router.patch("/:id", users.editUser);
router.get("/:id", users.getUser);
router.delete("/:id", users.deleteUser);

module.exports = router;
