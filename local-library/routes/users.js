var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/users/cool/", function(req, res, next) {
  res.render("users", { title: "You are awesome" });
});

module.exports = router;
