module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "companies",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        logo: {
         type: DataTypes.STRING(500),
         allowNull: true
        },
        email: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        zipcode: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        managerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            },
        createddate: {
          type: DataTypes.DATEONLY,
          default: Date.now(),
          allowNull: true,
        },
        createdby: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        updateddate: {
          type: DataTypes.DATEONLY,
          default: Date.now(),
          allowNull: true,
        },
        updatedby: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        activestatus: {
          type: DataTypes.INTEGER,
          allowNull: true,
          default: 1,
        },
      },
      {
        sequelize,
        tableName: "companies",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "companies_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  };
  