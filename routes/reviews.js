const express = require('express');
const reviews = require("../data/reviews");
const error = require("../utilities/error");

const router = express.Router();

// GET ROUTE

router
.route("/")
.get((req, res) => {
    res.json(reviews)
})
// POST ROUTE

.post((req, res, next) => {
    if(req.body.name && req.body.review) {
        const review = {
            id: reviews[reviews.length -1].id + 1,
            name: req.body.name,
            review: req.body.review
        };
        reviews.push(review);
        res.json(reviews[reviews.length - 1]);
    } else next(error(404, "Insufficient data. Please provide the information required."))
});

router
.route("/:id")
.get((req, res, next) => {
    const review = reviews.find((r) => r.id == req.params.id);
    if(review) res.json(review);
    else next(error(404, "Resource not found"))
})

//PATCH ROUTE
.patch((req, res, next) => {
    const review = reviews.find((r, i) => {
        if(r.id == req.params.id) {
            for(const key in req.body) {
                reviews[i][key] = req.body[key];
            }
            return true;
        }
    })
    if(review) res.json(review);
    else next(error(404, "Resource not found"))
})
//DELETE ROUTE
.delete((req, res, next) => {
    const review = reviews.find((r, i) => {
        if(r.id == req.params.id) {
            reviews.splice(i, 1);
            return true;
        }
    })
    if(review) res.json(review);
    else next(error(404, "Resource not found"))
})



module.exports = router;