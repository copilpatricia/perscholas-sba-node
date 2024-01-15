const express = require('express');
const products = require('../data/products');
const error = require("../utilities/error");

const router = express.Router();

// GET ROUTE

router
.route("/")
.get((req, res, next) => {
    const keys = ["blue", "yellow"];

    var key = req.query["color"];
    req.key = key;
    res.json(products);
})

router
.route("/:id")
.get((req, res, next) => {
    const product = products.find((p) => p.id == req.params.id);
    if(product) res.json(product);
    else next(error(404, "Resource not found"))
})
.patch((req, res, next) => {
    const product = products.find((p, i) => {
        if(p.id == req.params.id) {
            for(const key in req.body) {
                products[i][key] = req.body[key];
            }
            return true;
        }
    })
    if(product) res.json(product);
    else next(error(404, "Resource not found"))
})



module.exports = router;