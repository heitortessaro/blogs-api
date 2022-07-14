module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'Users',
    // underscored: true,
  });
  
  // 1:N
  // User.associate = (models) => {
  //   User.hasMany(models.BlogPosts,
  //     { foreignKey: 'id', as: 'userId' });
  // };
  return User;
};