
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicles', {
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
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    child_of: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    plate_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    make: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imei: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'vehicles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "vehicles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
