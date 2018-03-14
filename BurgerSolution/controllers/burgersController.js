var express = require("express");

var router = express.Router();
// var burger = require("../models/burger.js");

// get route -> index
var db = require("../models");


router.get("/", function(req, res) {
 res.redirect("/burgers");
});

  router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.Burger.findAll({}).then(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });

});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  db.Burger.create({ burger_name: req.body.burger_name }).then(function(result) {
    console.log(result);
    res.redirect("/burgers");
  })
});

router.put("/burgers/:id", function(req, res) {
  db.Burger.update({
    devoured: true
  },
  {
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    console.log(result);
    res.end();
  });
});

module.exports = router;
