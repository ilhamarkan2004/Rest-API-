exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  //   const image = req.body.image;
  const body = req.body.body;

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
};
