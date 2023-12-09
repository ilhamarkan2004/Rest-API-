const { validationResult } = require("express-validator");
exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  //   const image = req.body.image;
  const body = req.body.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // res.status(400).json({
    //   message: "Request Error",
    //   data: null,
    // });
    const err = new Error('Input value tidak sesuai');
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const result = {
    message: "Create Blog Post Success",
    data: {
      post_id: 1,
      tittle: title,
      image: "image.png",
      body: body,
      created_at: "12/06/2023",
      author: {
        uid: 1,
        name: "Testing",
      },
    },
  };
  res.status(201).json(result);
  next();
};
