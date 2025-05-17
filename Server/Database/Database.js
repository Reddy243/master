// db/db.js
const mysql = require('mysql2');

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'localhost',  // Your MySQL host
  user: 'root',       // MySQL username
  password: 'root',       // MySQL password (leave empty if none)
  database: 'shop_accounts',  // The name of your database
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

module.exports = db; // Export the connection for use in other files
