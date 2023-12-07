
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tbl_user_companies', {
      id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      companyId: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
      sequelize,
      tableName: 'tbl_user_companies',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "tbl_user_companies_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  };
  