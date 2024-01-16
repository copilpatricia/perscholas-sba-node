const express = require('express');
const products = require('../data/products');
const error = require("../utilities/error");

const router = express.Router();

// GET ROUTE

router
.route("/")
.get((req, res, next) => {
    const links = [
        {
            href: "products/:id",
            rel: ":id",
            type: "GET",
        }
      ];

    res.json(products, links);
})

router
.route("/:id")
.get((req, res, next) => {
    const product = products.find((p) => p.id == req.params.id);
    const links = [
        {
          href: `/${req.params.id}`,
          rel: "",
          type: "PATCH"
        },
      ]
    if(product) res.json({product, links});
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