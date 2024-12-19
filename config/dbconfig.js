const Sequelize = require('sequelize');

const DB = new Sequelize('nodelearn', 'dengwei', 'RGrVFVAfdGGID3V2', {
    host: 'mysql.sqlpub.com',
    dialect: 'mysql',
})

DB.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = DB;