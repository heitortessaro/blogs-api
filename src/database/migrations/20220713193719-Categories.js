'use strict';

module.exports = {
  /**
  * @param {import('sequelize').queryInterface } queryInterface 
  * @param {import('sequelize').Sequelize} Sequelize 
  */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type:Sequelize.SRING,
      }
    })
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};
