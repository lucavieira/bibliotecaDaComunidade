const database = require('./connection_database')

const Rents = database.connection.define('rents', {
    name: {
        type: database.Sequelize.STRING,
        allowNull: false
    },

    address: {
        type: database.Sequelize.STRING,
        allowNull: false
    },

    contact: {
        type: database.Sequelize.STRING,
        allowNull: false
    },

    bookID: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'livros',
            key: 'id'
        }
    },

    rent_date: {
        type: database.Sequelize.DATE,
        allowNull: false
    },

    return_date: {
        type: database.Sequelize.DATE,
        allowNull: false
    }
})

// Rents.sync()

module.exports = Rents