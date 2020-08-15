const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');
// $username = myusername; 
// $password = mypw; 
// $host = "db4free.net:3306"; 
// $dbname = mydbname; 
const events = require('./events');
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'farmers_app',
    password: 'Qwerty@123',
    database: 'farmers_app'
});
connection.connect();
const port = process.env.PORT || 8080;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(events(connection));
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});