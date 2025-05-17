// db/db.js
const mysql = require('mysql2');

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',  // Your MySQL host
  user: 'sql12779430',       // MySQL username
  password: 'Fvv8xbIrJN',       // MySQL password (leave empty if none)
  database: 'sql12779430',  // The name of your database
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
