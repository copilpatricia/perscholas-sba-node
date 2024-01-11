const express = require('express');
const reviews = require("../data/reviews");

const router = express.Router();

// GET ROUTE

router
.route("/")
.get((req, res) => {
    res.json(reviews)
})

module.exports = router;