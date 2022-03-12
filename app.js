const express = require('express')
const bodyParser = require('body-parser')
const Book = require('./models/Books')

const app = express()

// connection.query("INSERT INTO livros (titulo, autor, genero) VALUES ('Harry Potter e a Pedra Filosofal', 'JK. Rowling', 'Fantasia')")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/addbook', (req, res) => {
    res.sendFile(__dirname + '/views/cadastroLivro.html')
})

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

app.get('/alugarbook', (req, res) => {
    res.sendFile(__dirname + '/views/alugarLivro.html')
})

// Abrindo servidor na porta 5001
app.listen(5001, () => {
    console.log('Server is running')
})