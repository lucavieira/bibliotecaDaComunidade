const express = require('express')
const Sequelize = require('sequelize')

const app = express()

const connection = new Sequelize('biblioteca', 'root', 'L@moon$54S', {
    host: "localhost",
    dialect: 'mysql'
})

// connection.query("INSERT INTO livros (titulo, autor, genero) VALUES ('Harry Potter e a Pedra Filosofal', 'JK. Rowling', 'Fantasia')")

// Abrindo servidor na porta 5001
app.listen(5001, () => {
    console.log('Server is running')
})