const Sequelize = require('sequelize');
const Joi = require('joi');
const createError = require('../helpers/createError');
const { BlogPost, PostCategory } = require('../database/models/index');
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
    const postAndCategoriesIds = categoryIds.map((id) => ({ postId: newBlogPost.id,  
        categoryId: id }));
    const result = await PostCategory.bulkCreate(postAndCategoriesIds, { transaction: t });
    if (!result) throw new Error('Error with Adding to PostCategory');
    await t.commit();
    return newBlogPost;
  } catch (_error) {
    await t.rollback();
    createError(500, 'Error adding post to the DB.');
  }
}

module.exports = {
  addPost,
  validateBody,
};