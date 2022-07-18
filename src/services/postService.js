const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Joi = require('joi');
const createError = require('../helpers/createError');
const {
  BlogPost,
  PostCategory,
  User,
  Category,
} = require('../database/models/index');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateBody = async (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required().min(1),
  }).messages({
    'string.empty': 'Some required fields are missing',
  });
  const { error } = await schema.validateAsync(body);
  if (error) throw error;
};

const validateBodyUpdate = async (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
  });
  const { error } = await schema.validateAsync(body);
  if (error) throw error;
};

async function addPost({ title, content, categoryIds, userId }) {
  const t = await sequelize.transaction();
  try {
    const newBlogPost = await BlogPost.create(
      { title, content, userId, updated: new Date(), published: new Date() },
      { transaction: t },
    );
    const postAndCategoriesIds = categoryIds.map((id) => ({
      postId: newBlogPost.id,
      categoryId: id,
    }));
    const result = await PostCategory.bulkCreate(postAndCategoriesIds, { transaction: t });
    if (!result) throw new Error('Error with Adding to PostCategory');
    await t.commit();
    return newBlogPost;
  } catch (_error) {
    await t.rollback();
    createError(500, 'Error adding post to the DB.');
  }
}

async function getAllPosts() {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
}

async function getPostById({ id }) {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) {
    createError(404, 'Post does not exist');
  }
  return result;
}

async function updatePost({ title, content, id, userId }) {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) {
    createError(404, 'Post does not exist');
  }
  if (userId !== post.userId) {
    createError(401, 'Unauthorized user');
  }
  post.set({ content, title, updated: new Date() });
  await post.save();
  await post.reload();
  return post;
}

async function deletePost({ id, userId }) {
  const post = await BlogPost.findByPk(id);
  if (!post) {
    createError(404, 'Post does not exist');
  }
  if (userId !== post.userId) {
    createError(401, 'Unauthorized user');
  }
  await post.destroy();
}

async function searchPost({ query }) {
  const querySequilize = `%${query}%`;
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: querySequilize } },
        { content: { [Op.like]: querySequilize } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
}

module.exports = {
  addPost,
  validateBody,
  getAllPosts,
  getPostById,
  updatePost,
  validateBodyUpdate,
  deletePost,
  searchPost,
};
