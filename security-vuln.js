/**
 * Security vulnerability test file for PR comment testing
 * This file contains intentional vulnerabilities for Coverity detection
 */

const express = require("express");
const mysql = require("mysql");
const { exec } = require("child_process");
const fs = require("fs");
const crypto = require("crypto");

// Database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",  // Hardcoded credentials - HIGH severity
    database: "userdb"
});

// SQL Injection vulnerability - CRITICAL/HIGH severity
function getUserById(req, res) {
    const userId = req.params.id;
    // Direct string concatenation - SQL Injection
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    connection.query(query, function(err, results) {
        if (err) throw err;
        res.json(results);
    });
}

// SQL Injection with template literal - CRITICAL/HIGH severity
function searchUsers(req, res) {
    const searchTerm = req.query.term;
    const sql = `SELECT * FROM users WHERE name LIKE '%${searchTerm}%'`;
    connection.query(sql, (err, results) => {
        res.json(results);
    });
}

// Command Injection - CRITICAL severity
function runCommand(req, res) {
    const cmd = req.body.command;
    // Direct use of user input in shell command
    exec(cmd, (error, stdout, stderr) => {
        res.send(stdout);
    });
}

// Path Traversal - HIGH severity
function readFile(req, res) {
    const filename = req.query.file;
    // Direct use of user input in file path
    const content = fs.readFileSync("/data/" + filename, "utf8");
    res.send(content);
}

// Weak Cryptography - MEDIUM/HIGH severity
function hashPassword(password) {
    // Using weak MD5 hash
    return crypto.createHash("md5").update(password).digest("hex");
}

// Insecure Random - MEDIUM severity
function generateToken() {
    // Using Math.random() for security token
    return Math.random().toString(36).substring(2);
}

// Export vulnerable functions
module.exports = {
    getUserById,
    searchUsers,
    runCommand,
    readFile,
    hashPassword,
    generateToken
};
