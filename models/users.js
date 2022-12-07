
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updateddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activestatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    oldPassword: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    repassword: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
