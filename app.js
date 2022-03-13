const express = require('express')
const bodyParser = require('body-parser')
const Book = require('./models/Books')
const Rents = require('./models/Rents')
const path = require('path')
const session = require('express-session') // Armazena os dados da sessão no servidor, salva apenas o ID no cookie.
const flash = require('connect-flash') // Flash para criar as mensagens e mostrar na tela apenas por um breve momento 
// const con = require('./models/connection_database')

const consolidate = require('consolidate') // Config template HTML

const app = express()

// CONFIGS
    // SESSION
        app.use(session({
            secret: 'biblioteca',
            resave: true,
            saveUninitialized: true
        }))

        app.use(flash())
    //MIDDLEWARE
        app.use((req, res, next) => {
            // Variaveis globais que irão armazenar mensagens de sucesso ou de error
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
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
            let erros = []

            if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
                erros.push('Invalid title. Try again')
            }

            if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {
                erros.push('Invalid author. Try again')
            }

            if(erros.length > 0) {
                res.send('ERROR')
            } else {
                Book.create({
                    titulo: req.body.titulo,
                    autor: req.body.autor,
                    genero: req.body.genero
                }).then(() => {
                    req.flash('success_msg', 'Book created')
                    res.redirect('/addbook')
                }).catch(error => {
                    req.flash('error_msg', 'Book not created')
                    res.send('Error ' + error)
                })
            }

        })

        // app.post('/newbook', (req, res) => {
        //     con.connection.query(`INSERT INTO teste (titulo, autor, genero) VALUES ('${req.body.titulo}', '${req.body.autor}', '${req.body.genero}')`)
        // })

    // SELECT BOOKS
        app.get('/rentbook', (req, res) => {
            Book.findAll().then(book => {
                res.render('rent_book', {books: book})
            }).catch(error => {
                console.log('Error ' + error)
            })
            //res.sendFile(__dirname + '/views/alugarLivro.html')
        })

    // RENT A BOOK
        app.post('/rent', (req, res) => {
            let erros = []

            if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
                erros.push({text: 'Invalid Name. Try Again!'})
            }

            if(!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null) {
                erros.push({text: 'Invalid Address. Try Again!'})
            }

            if(!req.body.rent_date || typeof req.body.rent_date == undefined || req.body.rent_date == null) {
                erros.push({text: 'Invalid rent date. Try Again!'})
            }

            if(!req.body.return_date || typeof req.body.return_date == undefined || req.body.return_date == null) {
                erros.push({text: 'Invalid return date. Try Again!'})
            }

            if(erros.length > 0) {
                res.send('ERROR')
            } else {
                Rents.create({
                    name: req.body.nome,
                    address: req.body.endereco,
                    contact: req.body.contato,
                    bookID: req.body.livro,
                    rent_date: req.body.rent_date,
                    return_date: req.body.return_date
                }).then(() => {
                    Book.update(
                        {rent: 'Alugado'},
                        {where: {id: req.body.livro}}
                    ).then(() => {
                        req.flash('success_msg', 'Rented book')
                        res.redirect('/rentbook')
                    }).catch(error => {
                        req.flash('error_msg', 'Failed in rent a book')
                        res.redirect('/rentbook')
                    })
                }).catch(error => {
                    res.send('Error ' + error)
                })
            }

        })

// Abrindo servidor na porta 5001
app.listen(5001, () => {
    console.log('Server is running')
})