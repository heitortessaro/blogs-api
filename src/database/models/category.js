module.exports = (sequelize,DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    underscore:false,
    tableName: 'Categories',
    timestamps: false,
  });
  // 1:N
  // Category.associate = (models) => {
  //   Category.hasMany(models.PostCategories,
  //     { foreignKey: 'id', as: 'categoryId' });
  // };
  return Category
};