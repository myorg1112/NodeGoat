const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/run', (req, res) => {
    const cmd = req.query.cmd;
    exec(cmd, (err, stdout) => {
        res.send(stdout);
    });
});

app.get('/hello', (req, res) => {
    res.send('<h1>Welcome ' + req.query.name + '</h1>');
});

module.exports = app;
