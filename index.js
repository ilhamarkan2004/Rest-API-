const express = require("express");
const app = express();

const productRoute = require("./src/routes/products")

app.use("/", productRoute);

app.listen(4000);
