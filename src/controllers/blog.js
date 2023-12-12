const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // res.status(400).json({
    //   message: "Request Error",
    //   data: null,
    // });
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422;
    err.data = errors.array();
    throw err;
  }
  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new BlogPost({
    title: title,
    image: image,
    body: body,
    author: {
      uid: 1,
      name: "Mohammad Ilham",
    },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Blog Post Success",
        data: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Data BlogPost Berhasil Dipanggil",
        data: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};
