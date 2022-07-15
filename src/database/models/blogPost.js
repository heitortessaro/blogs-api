module.exports = (sequilize, DataTypes) => {
  const BlogPost = sequilize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    underscore:false,
    tableName: 'BlogPosts',
    timestamps: false,
  })

  // N:1
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      {foreingKey: 'userId', as: 'user'})
  }

  return BlogPost
}


