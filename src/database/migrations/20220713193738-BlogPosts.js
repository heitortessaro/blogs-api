'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type:Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type:Sequelize.STRING,
      },
      userId: {
        type:Sequelize.INTEGER,
        references: { 
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BlogPosts');
  }
};
