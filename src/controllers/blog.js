const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const path = require("path");
const fs = require("fs");
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
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;
  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data BlogPost Berhasil Dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("BlogPost tidak ditemukan");
        error.errorStatus(404);
        throw error;
      }
      res.status(200).json({
        message: "Data Blogpost berhasil dipanggil",
        data: result,
      });
    })
    .catch((error) => next(error));
};

exports.updateBlogPost = (req, res, next) => {
  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422;
    err.data = errors.array();
    throw err;
  }
  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Blogpost tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      post.title = title;
      post.image = image;
      post.body = body;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Update blogpost sukses", data: result });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Blogpost tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      removeImage(post.image);
      return BlogPost.findByIdAndDelete(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus blogpost berhasil",
        data: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const removeImage = (filepath) => {
  console.log(filepath);

  filepath = path.join(__dirname, "../..", filepath);
  fs.unlink(filepath, (error) => console.log(error));
};
