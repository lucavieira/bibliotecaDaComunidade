const express = require('express')
const bodyParser = require('body-parser')
const Book = require('./models/Books')
const Rents = require('./models/Rents')
const path = require('path')
// const con = require('./models/connection_database')

const consolidate = require('consolidate') // Config template HTML

const app = express()

// CONFIGS
    // TEMPLATES HTML
        app.engine('html', consolidate.swig)
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'html');

    // BODY PARSER
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
        app.use(express.static(__dirname + '/public'))

    // ROUTES
    // HOME
        app.get('/', (req, res) => {
            res.render('home')
        })

    // ADD NEW BOOK
        app.get('/addbook', (req, res) => {
            res.render('register_book')
        })

    // ADD IN DATABASE
        app.post('/newbook', (req, res) => {
            Book.create({
                titulo: req.body.titulo,
                autor: req.body.autor,
                genero: req.body.genero
            }).then(() => {
                res.redirect('/')
            }).catch(error => {
                res.send('Error ' + error)
            })
        })

        // app.post('/newbook', (req, res) => {
        //     con.connection.query(`INSERT INTO teste (titulo, autor, genero) VALUES ('${req.body.titulo}', '${req.body.autor}', '${req.body.genero}')`)
        // })

    // RENT BOOK
        app.get('/rentbook', (req, res) => {
            Book.findAll().then(book => {
                res.render('rent_book', {books: book})
            }).catch(error => {
                console.log('Error ' + error)
            })
            //res.sendFile(__dirname + '/views/alugarLivro.html')
        })

        app.post('/rent', (req, res) => {
            let erros = []

            if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
                erros.push({text: 'Invalid Name. Try Again!'})
            }

            if(!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null) {
                erros.push({text: 'Invalid Address. Try Again!'})
            }

            Rents.create({
                name: req.body.nome,
                address: req.body.endereco,
                contact: req.body.contato,
                bookID: req.body.livro,
                rent_date: req.body.rent_date,
                return_date: req.body.return_date
            }).then(() => {
                res.redirect('/')
            }).catch(error => {
                res.send('Error ' + error)
            })
        })

// Abrindo servidor na porta 5001
app.listen(5001, () => {
    console.log('Server is running')
})