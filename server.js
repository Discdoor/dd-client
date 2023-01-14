/*
Simple client server.
*/

const express = require('express');
const app = express();
const config = require('./data/server.json');
const path = require('path');

// Map resources
app.use('/', express.static(path.join(__dirname, "dist")));

// Use react router
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});  

// Start server
app.listen(config.http.port, '0.0.0.0', () => {
    console.log(`Client server listening at ${config.http.port}!`);
});