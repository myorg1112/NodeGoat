// Test file — intentionally vulnerable code for scan verification
const express = require('express');
const { exec } = require('child_process');
const app = express();

// SAST: OS Command Injection (CWE-78)
app.get('/ping', (req, res) => {
    const host = req.query.host;
    exec('ping -c 1 ' + host, (err, stdout) => {
        res.send(stdout);
    });
});

// SAST: SQL Injection (CWE-89)
app.get('/user', (req, res) => {
    const id = req.query.id;
    const query = "SELECT * FROM users WHERE id = '" + id + "'";
    res.send(query);
});

// SAST: XSS (CWE-79)
app.get('/greet', (req, res) => {
    const name = req.query.name;
    res.send('<h1>Hello ' + name + '</h1>');
});

module.exports = app;
