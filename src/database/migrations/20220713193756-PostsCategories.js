'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PostsCategories',{
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: "CASCADE",
        primaryKey: true,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PostsCategories');
  }
};
