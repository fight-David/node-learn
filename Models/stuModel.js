const DB = require("../config/dbconfig"); // 导入数据库配置文件
const Sequelize = require("sequelize"); // 导入模块

// stu是数据库的表名
const stuModel = DB.define("student", {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER, // 数据类型改为INT
        field: "id",
        autoIncrement: true // 自增
    },
    name: {
        type: Sequelize.STRING(30), // 数据类型改为STRING(30)
        allowNull: false,
        defaultValue: '匿名', // 默认值为'匿名'
        field: "name"
    },
    pwd: {
        type: Sequelize.STRING(20), // 数据类型改为STRING(20)
        allowNull: false,
        defaultValue: '123456', // 默认值为'123456'
        field: "pwd"
    },
    sex: {
        type: Sequelize.STRING(2), // 数据类型改为STRING(2)
        allowNull: false,
        defaultValue: '女', // 默认值为'女'
        field: "sex"
    },
    birthday: {
        type: Sequelize.DATE, // 数据类型改为DATE
        defaultValue: null, // 默认值为null
        field: "birthday"
    },
    address: {
        type: Sequelize.STRING(100), // 数据类型改为STRING(100)
        defaultValue: null, // 默认值为null
        field: "address"
    },
    email: {
        type: Sequelize.STRING(50), // 数据类型改为STRING(50)
        defaultValue: null, // 默认值为null
        field: "email"
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = stuModel;