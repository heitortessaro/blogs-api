const Sequelize = require('sequelize');
const Joi = require('joi');
const createError = require('../helpers/createError');
const { BlogPost, PostCategory, User, Category } = require('../database/models/index');
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

async function addPost({ title, content, categoryIds, userId }) {
  const t = await sequelize.transaction();
  try {
    const newBlogPost = await BlogPost.create(
      { title, content, userId, updated: new Date(), published: new Date() },
      { transaction: t },
    );
    console.log(newBlogPost.id);
    const postAndCategoriesIds = categoryIds.map((id) => ({ postId: newBlogPost.id,  
        categoryId: id }));
    console.log(postAndCategoriesIds);
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
      // { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return result;
}

// Patients.findAll({
//   include: { model: Surgeries, as: 'surgeries', through: { attributes: [] } },
// })

// const pets = await Pet.findAll({
//   include: [{ model: User, as: 'user', attributes: { exclude: ['passwordHash'] } }],
// });

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

module.exports = {
  addPost,
  validateBody,
  getAllPosts,
  getPostById,
};