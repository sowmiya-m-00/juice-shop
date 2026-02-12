const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const app = express();
const db = new sqlite3.Database(':memory:');

// 1. SQL Injection Vulnerability
// Snyk should flag this because user input is concatenated directly into the query.
app.get('/user', (req, res) => {
    const query = "SELECT * FROM users WHERE id = " + req.query.id;
    db.get(query, [], (err, row) => {
        if (err) res.status(500).send(err);
        res.send(row);
    });
});

// 2. Path Traversal (Insecure Local File Inclusion)
// Snyk should flag this because it allows users to potentially read any file on the system.
app.get('/read-file', (req, res) => {
    const filePath = './public/' + req.query.fileName;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) res.status(404).send('File not found');
        res.send(data);
    });
});

app.listen(3000, () => console.log('Vulnerable server running on port 3000'));
