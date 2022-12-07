
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_roles', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING(2500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_roles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
