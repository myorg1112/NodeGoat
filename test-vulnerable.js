
// Test file with security issue
const express = require("express");
const app = express();

// SQL Injection vulnerability for testing
app.get("/user", (req, res) => {
    const userId = req.query.id;
    const query = "SELECT * FROM users WHERE id = " + userId;  // SQL Injection!
    db.query(query, (err, result) => {
        res.json(result);
    });
});

// Hardcoded credential for testing
const API_KEY = "sk-1234567890abcdef";  // Hardcoded secret!

module.exports = app;

