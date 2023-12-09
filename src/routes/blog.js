const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const { body } = require("express-validator");

// POST : v1/blog/post
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Input title tidak sesuai"),
    body("body").isLength({ min: 5 }).withMessage("Input body tidak sesuai"),
  ],
  blogController.createBlogPost
);

module.exports = router;