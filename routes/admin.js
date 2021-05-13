const path = require("path");
const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
	res.render("add-product", { pageTitle: "Add Product", path: "/add-product" });
});

const product = [];
router.post("/add-product", (req, res, next) => {
	product.push({ title: req.body.title });
	res.redirect("/");
});

exports.routes = router;
exports.product = product;
