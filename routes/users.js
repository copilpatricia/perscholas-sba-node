const express = require('express');
const users = require('../data/users');

const router = express.Router();

// GET ROUTE

router
.route("/")
.get((req, res) => {
    res.json(users);
})
.post((req, res) => {
    if(req.body.name && req.body.username && req.body.email){
      if(users.find((u) => u.username == req.body.username)) {
        console.log("error")
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
    }else {
        console.log("insufficient data")
    }
})
module.exports = router;