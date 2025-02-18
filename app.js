const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 8080;

// Conexão com o banco de dados
const db = new sqlite3.Database('/usr/src/app/database/messages.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        // Criar tabela se não existir
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT NOT NULL
        )`);
        
        // Inserir mensagem inicial se a tabela estiver vazia
        db.get("SELECT COUNT(*) as count FROM messages", (err, row) => {
            if (row.count === 0) {
                db.run("INSERT INTO messages (message) VALUES (?)", ["Hello, Docker World!"]);
            }
        });
    }
});

app.get('/', async (req, res) => {
    db.get("SELECT message FROM messages ORDER BY id DESC LIMIT 1", (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: row ? row.message : 'No messages found' });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Aplicação rodando na porta ${port}`);
});