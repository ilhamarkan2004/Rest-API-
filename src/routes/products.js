const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

router.get("/products", productsController.getAllProducts);
router.post("/product", productsController.createProduct);
router.put("/products", (req, res, next) => {
  res.json({ name: "Arkan" });
  next();
});
router.delete("/products", (req, res, next) => {
  res.json({ name: "Arkan" });
  next();
});

module.exports = router;
