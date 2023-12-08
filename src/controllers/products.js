exports.createProduct = (req, res, next) => {
  res.json({
    message: "Create product success",
    data: {
      id: 1,
      name: "Botol",
      price: 2000,
    },
  });
  next();
};

exports.getAllProducts = (req, res, next) => {
  res.json({
    message: "Get All Products Success",
    data: [
      {
        id: 1,
        name: "Roti Lapis",
        price: 1000,
      },
      {
        id: 2,
        name: "Roti Gandum",
        price: 4000,
      },
    ],
  });
  next();
};
