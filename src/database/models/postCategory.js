module.exports = (sequilize, DataTypes) => {
  const PostCategory = sequilize.define('PostCategory', {
    postId:{ type: DataTypes.INTEGER, primaryKey: true},
    categoryId: { type: DataTypes.INTEGER, primaryKey: true},
  }, {
    underscore:false,
    tableName: 'PostCategories',
    timestamps: false,
  })

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      // foreingKey: 'id',
      // otherKey: 'id',
      foreignKey: 'categoryId',
      otherKey: 'postId'
    }),
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through:PostCategory,
      // foreingKey: 'id',
      // otherKey: 'id',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  }

  return PostCategory
}