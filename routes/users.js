const express = require('express');
const users = require('../data/users');

const router = express.Router();

// GET ROUTE

router
.route("/")
.get((req, res) => {
    res.json(users);
});

module.exports = router;