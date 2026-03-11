const express = require('express');
const { exec } = require('child_process');
const app = express();

// OS Command Injection (CWE-78)
app.get('/run', (req, res) => {
    const cmd = req.query.cmd;
    exec(cmd, (err, stdout) => {
        res.send(stdout);
    });
});

// SQL Injection (CWE-89)
app.get('/search', (req, res) => {
    const term = req.query.q;
    const sql = "SELECT * FROM products WHERE name = '" + term + "'";
    res.send(sql);
});

// XSS (CWE-79)
app.get('/hello', (req, res) => {
    res.send('<h1>Welcome ' + req.query.name + '</h1>');
});

module.exports = app;
