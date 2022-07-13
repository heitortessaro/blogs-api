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
        type:Sequelize.SRING,
      },
      content: {
        allowNull: false,
        type:Sequelize.SRING,
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
