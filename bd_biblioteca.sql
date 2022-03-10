CREATE DATABASE biblioteca;

CREATE TABLE livros(
    id_livro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    autor VARCHAR(50) NOT NULL,
    genero VARCHAR(100) NOT NULL
);

CREATE TABLE livros_alugados(
    id_livro_alugado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    contato VARCHAR(11) NOT NULL,
    id_livro INT NOT NULL,
    data_alugada DATE NOT NULL,
    data_devolucao DATE NOT NULL
);

ALTER TABLE livros_alugados ADD CONSTRAINT FK_livrosAlugados_livros FOREIGN KEY (id_livro) REFERENCES livros (id_livro);