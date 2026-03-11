// Test file for PR comment verification - introduces intentional vulnerabilities
const { exec } = require("child_process");

// Command Injection: user input directly passed to exec
function runDiagnostic(req, res) {
    const host = req.query.host;
    exec("ping -c 4 " + host, (err, stdout) => {
        res.send(stdout);
    });
}

// SQL Injection: string concatenation in query
function searchUser(req, res, db) {
    const username = req.query.name;
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    db.query(query, (err, results) => {
        res.json(results);
    });
}

// Path Traversal: user input used in file path
const fs = require("fs");
function downloadFile(req, res) {
    const filename = req.query.file;
    const filepath = "/var/data/" + filename;
    const content = fs.readFileSync(filepath);
    res.send(content);
}

// XSS: reflected user input without sanitization
function greetUser(req, res) {
    const name = req.query.name;
    res.send("<h1>Hello " + name + "</h1>");
}

module.exports = { runDiagnostic, searchUser, downloadFile, greetUser };
