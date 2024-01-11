const express = require('express');
const reviews = require("../data/reviews");

const router = express.Router();

// GET ROUTE

router
.route("/")
.get((req, res) => {
    res.json(reviews)
})
.post((req, res) => {
    if(req.body.name && req.body.review) {
        const review = {
            id: reviews[reviews.length -1].id + 1,
            name: req.body.name,
            review: req.body.review
        };
        reviews.push(review);
        res.json(reviews[reviews.length - 1]);
    } else { console.log("insufficient data")}
})

module.exports = router;