const express = require('express')
const bodyParser = require('body-parser')
const Book = require('./models/Books')
// const con = require('./models/connection_database')

const app = express()

// CONFIGS

    // BODY PARSER
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
        app.use(express.static(__dirname + '/public'))

// ROUTES

    // HOME
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/views/home.html')
        })

    // ADD NEW BOOK
        app.get('/addbook', (req, res) => {
            res.sendFile(__dirname + '/views/cadastroLivro.html')
        })

    // ADD IN DATABASE
        app.post('/newbook', (req, res) => {
            Book.create({
                titulo: req.body.titulo,
                autor: req.body.autor,
                genero: req.body.genero
            }).then(() => {
                res.send('Sucesso')
            }).catch(error => {
                res.send('Error ' + error)
            })
        })

        // app.post('/newbook', (req, res) => {
        //     con.connection.query(`INSERT INTO teste (titulo, autor, genero) VALUES ('${req.body.titulo}', '${req.body.autor}', '${req.body.genero}')`)
        // })

    // RENT BOOK
        app.get('/rentbook', (req, res) => {
            res.sendFile(__dirname + '/views/alugarLivro.html')
        })

// Abrindo servidor na porta 5001
app.listen(5001, () => {
    console.log('Server is running')
})