
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_routes', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    min: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    max: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_routes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tblRoutes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
