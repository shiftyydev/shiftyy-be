'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { hashPassword } = require('../middleware/isLoggedIn');
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
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// relations
try {
  db.tbl_routes.hasMany(db.tbl_route_addresses, {
    foreignKey: 'route_id',
    as: 'addresses',
  });
  db.tbl_routes.belongsTo(db.users, {
    foreignKey: 'creator_id',
    as: 'users',
  });
  db.companies.belongsToMany(db.users, {
    through: db['tbl_user_companies'],
    as: 'users',
    foreignKey: 'companyId',
  });
  db.users.belongsToMany(db.companies, {
    through: db['tbl_user_companies'],
    as: 'companies',
    foreignKey: 'user_id',
  });
} catch (e) {
  console.log(e);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Ensure the table and relationships have been set up
sequelize
  .sync({ force: false, alter: true })
  .then(async () => {
    const roles = [
      {
        role_name: 'super admin',
        role_id: 2,
      },
      {
        role_name: 'manager',
        role_id: 1,
      },
      {
        role_name: 'driver',
        role_id: 3,
      },
    ];
    await Promise.all(
      roles.map(async (data) => {
        const existingRole = await db.user_roles.findOne({
          where: { role_name: data.role_name },
        });
        if (!existingRole) {
          await db.user_roles.create({
            role_name: data.role_name,
            id: data.role_id,
          });
          console.log(`Added ${data.role_name} to the user_roles table.`);
        }
      })
    ).catch((error) => {
      console.error('Error adding initial roles:', error);
    });

    // Check if the users table is empty
    db.users
      .count()
      .then(async (count) => {
        if (count === 0) {
          // Add users to the table if it's empty
          db.users.bulkCreate([
            {
              id: 0,
              email: 'superadmin@gmail.com',
              password: await hashPassword('Me@1234'),
              roleid: 2,
              isAdmin: true,
            },
          ]);
          console.log('Added initial users to the users table.');
        }
      })
      .catch((error) => {
        console.error('Error adding initial users:', error);
      });
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

module.exports = db;
