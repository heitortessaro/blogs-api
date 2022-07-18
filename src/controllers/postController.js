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

// Patients.findAll({
//   include: { model: Surgeries, as: 'surgeries', through: { attributes: [] } },
// })

// const pets = await Pet.findAll({
//   include: [{ model: User, as: 'user', attributes: { exclude: ['passwordHash'] } }],
// });

module.exports = {
  addPost,
  getAllPosts,
};