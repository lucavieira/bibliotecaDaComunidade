const database = require('./connection_database')

const Book = database.connection.define('livros', {
    titulo: {
        type: database.Sequelize.STRING,
        allowNull: false
    },

    autor: {
        type: database.Sequelize.STRING,
        allowNull: false
    },

    genero: {
        type: database.Sequelize.STRING,
        allowNull: false
    }
})

// Book.sync()

module.exports = Book