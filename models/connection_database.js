const Sequelize = require('sequelize')

const connection = new Sequelize('biblioteca', 'root', 'L@moon$54S', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    connection: connection
}