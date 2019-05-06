const Sequelize = require("sequelize")
const config = require("config")

const db = config.get("pgURI")

const sequelize = new Sequelize(db)

module.exports = sequelize