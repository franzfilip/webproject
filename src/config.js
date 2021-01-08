const Sequelize = require('sequelize');

var sequelize = new Sequelize('webproject', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

module.exports = sequelize;