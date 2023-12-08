const express = require("express");
const app = express();

const productRoute = require("./src/routes/products")

app.use("/v1/customer", productRoute);

app.listen(4000);
