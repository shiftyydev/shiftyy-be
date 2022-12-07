
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_route_addresses', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    complete_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    geom: {
      type: DataTypes.GEOMETRY('GEOMETRY', 0),
      allowNull: true
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_route_addresses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tbl_route_addresses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
