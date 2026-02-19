//importo sql

const mysql = require('mysql2');

//creo connessione che mi servirà dopo con le mie credenziali

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db-new'
});

// stampo per vedere se hoqualche errore

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});
module.exports = connection;