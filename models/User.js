const Sequelize = require('sequelize')

const sequelize = require('../config/db')


const User = sequelize.define('user', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.BLOB('medium')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
})

module.exports = User