const postService = require('../services/postService');
const categoryService = require('../services/categoryService');

const addPost = async (req, res) => {
  await postService.validateBody(req.body);
  const { title, content, categoryIds } = req.body;
  console.log(categoryIds);
  await categoryService.validateId({ categoryIds });
  const { id: userId } = req.user;
  const post = await postService.addPost({ title, content, categoryIds, userId });
  return res.status(201).json(post);
};

module.exports = {
  addPost,
};