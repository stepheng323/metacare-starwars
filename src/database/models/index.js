const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { NODE_ENV } = require('../../config/contants');
const configs = require('../../config/config');

const basename = path.basename(__filename);
const env = NODE_ENV || 'development';
const config = configs[env];
const db = {};

const sequelize = config.use_env_variable
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
