module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      movieId: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.STRING(500)
      },
      publicIp: {
        type: DataTypes.STRING()
      },
    },
    {}
  );

  Comments.associate = (models) => {

  };

  return Comments;
};
