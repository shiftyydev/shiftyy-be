'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize({
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB}`,
  host: `${process.env.DB_HOST}`,
  dialect: 'postgres',
  // logging: false
});


fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// relations
try {
  db.tbl_routes.hasMany(db.tbl_route_addresses, {
    foreignKey: 'route_id',
    as: 'addresses'
  });
} catch (e) {
  console.log(e);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
