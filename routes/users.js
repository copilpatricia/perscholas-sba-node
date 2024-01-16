const express = require('express');
const users = require('../data/users');
const error = require("../utilities/error");

const router = express.Router();

router
.route("/")
// GET ROUTE
.get((req, res) => {
    const links = [
      {
          href: "users/:id",
          rel: ":id",
          type: "GET",
      }
    ];
    res.json(users, links);
})
//POST ROUTE
.post((req, res, next) => {
    if(req.body.name && req.body.username && req.body.email){
      if(users.find((u) => u.username == req.body.username)) {
        next(error(404, "Username is taken"))
        return;
      } 
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
      }
      users.push(user);
      res.json(users[users.length - 1]);
    }else next(error(404, "Insufficient data. Please provide the information required."))
})

router
.route("/:id")
.get((req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  const links = [
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "PATCH"
    },
  ]

  if(user) res.json({user, links});
  else next(error(404, "Resource not found"))
})
.patch((req, res, next) => {
  const user = users.find((u, i) => {
    if(u.id == req.params.id) {
      for(const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  })
  if(user) res.json(user);
  else next(error(404, "Resource not found"))
})
module.exports = router