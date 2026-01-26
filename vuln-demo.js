// Vulnerability demo for PR comment testing
const express = require("express");
const mysql = require("mysql");

// SQL Injection - very obvious pattern
function searchUser(req, res) {
    const userId = req.params.id;
    const query = "SELECT * FROM users WHERE id = " + userId;  // SQL Injection!
    connection.query(query, (err, results) => {
        res.json(results);
    });
}

// Hardcoded password
const SECRET_KEY = "hardcoded_secret_12345";
const API_KEY = "AKIAIOSFODNN7EXAMPLE";

module.exports = { searchUser, SECRET_KEY, API_KEY };
