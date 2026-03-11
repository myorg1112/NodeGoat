const express = require('express');
const { exec } = require('child_process');
const app = express();

// OS Command Injection — typically HIGH severity
app.get('/exec', (req, res) => {
    exec('ls ' + req.query.dir, (err, out) => { res.send(out); });
});

// XSS — typically HIGH severity
app.get('/page', (req, res) => {
    res.send('<div>' + req.query.content + '</div>');
});

module.exports = app;
