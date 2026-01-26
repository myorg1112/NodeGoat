// New test file with security issues for PR comment testing
const express = require("express");
const app = express();

// SQL Injection vulnerability - NEW FILE
app.get("/api/search", (req, res) => {
    const keyword = req.query.keyword;
    const query = "SELECT * FROM products WHERE name LIKE '%" + keyword + "%'";  // SQL Injection!
    db.query(query, (err, result) => {
        res.json(result);
    });
});

// Hardcoded credential - NEW FILE
const DB_PASSWORD = "super_secret_password_123";  // Hardcoded secret!
const AWS_KEY = "AKIAIOSFODNN7EXAMPLE";  // Hardcoded AWS key!

// Sensitive data exposure
app.get("/api/debug", (req, res) => {
    res.json({
        password: DB_PASSWORD,
        awsKey: AWS_KEY
    });
});

module.exports = app;
