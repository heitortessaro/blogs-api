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

const getAllPosts = async (_req, res) => {
  const posts = await postService.getAllPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById({ id });
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  await postService.validateBodyUpdate(req.body);
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;
  const post = await postService.updatePost({ title, content, id, userId });
  return res.status(200).json(post);
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
};