const express = require('express');
const cors = require('cors'); // Optional but needed if frontend is on a different port
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing
const db = require('../Database/Database.js'); // Import the database connection

const app = express();
app.use(cors()); // Optional: only needed if frontend is on a different port (like 5173 or 3000)

// Middleware to parse JSON
app.use(express.json());

app.post('/api/Login', (req, res) => {
    console.log('Incoming data:', req.body);
    const { name, password } = req.body;
    // Query to check both username and password
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [name, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const userRole = results[0].role; // Assuming 'role' is the column name
        //console.log('Role:', userRole);  // Log role to console
        return res.status(200).json({
            success: true,
            role: userRole, // Send the role back in the response
            message: 'Login successful'
        });
    });
});

// Signup API endpoint
app.post('/api/Signup', async (req, res) => {
    const { name, mobile, password } = req.body;
    if (!name || !mobile || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
        // Hash the password before saving it to the database
        //const hashedPassword = await bcrypt.hash(password, 10);
        // Insert the new user into the database
        db.query(
            'INSERT INTO users (username, mobile, password) VALUES (?, ?, ?)',
            [name, mobile, password],
            (err, results) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ success: false, message: 'Failed to create user' });
                }
                console.log('Results Singup: ',results);
                res.status(200).json({ success: true, message: 'Signup successful' });
            }
        );
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the user' });
    }
});
/*
This is to understanding Purpose


app.post('/api/Order', (req, res) => {
    console.log("Request   :", req.body);
    const {customerName, number, address, amount} = req.body;
    if (!customerName || !number || !address || !amount) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    // Optionally, you can save the order to a database here
    return res.status(200).json({ success: true, message: "Order placed successfully!" });
});
*/

// Order Route to insert data into MySQL
app.post('/api/Order', (req, res) => {
    console.log("Request   :", req.body);
    const { customerName, number, address, amount } = req.body;
    // Validate input
    if (!customerName || !number || !address || !amount) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }  
    // Prepare SQL query to insert data into the orders table
    const query = 'INSERT INTO orders (customerName, number, address, amount) VALUES (?, ?, ?, ?)';    
    // Execute the query
    db.query(query, [customerName, number, address, amount], (err, results) => {
      if (err) {
        console.error('Error inserting order:', err);
        return res.status(500).json({ success: false, message: 'Failed to place order' });
      }
      console.log('Order placed successfully:', results);
      return res.status(200).json({ success: true, message: "Order placed successfully!" });
    });
});

// Order Route to Update data into MySQL
app.put('/api/Order', (req, res) => {
    console.log("Request   :", req.body);
    const { customerName, number} = req.body;
    // Validate input
    if (!customerName || !number) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }  
    // Prepare SQL query to insert data into the orders table
    const query = 'UPDATE orders SET paymentStatus = ?, orderStatus =? WHERE customerName = ? AND number= ?';    
    // Execute the query
    db.query(query, ['Paid','Completed', customerName, number], (err, results) => {
      if (err) {
        console.error('Error Updating order:', err);
        return res.status(500).json({ success: false, message: 'Failed to place order' });
      }
      console.log('Order Updated successfully:', results);
      return res.status(200).json({ success: true, message: "Order Updated successfully!" });
    });
});


app.get('/api/Orders', (req, res) => {
    const OrdersQuery = "SELECT * FROM orders"; // SQL query to get all orders
    db.query(OrdersQuery, (err, result) => {
        if (err) {
            // If there's an error with the query, return a 500 server error response
            console.error('Error fetching orders:', err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch orders from the database.'
            });
        }   
        console.log('Orders result:', result);     
        if (result.length === 0) {
            // If no orders are found, return a 404 response indicating no data
            return res.status(200).json({
                success: true,
                message: 'No orders found.'
            });
        }
        // If orders are found, return them in the response
        return res.status(200).json({
            success: true,
            message: 'Orders fetched successfully.',
            orders: result // Return the result from the database
        });
    });
});

app.post('/api/feedback', (req, res) => {
    const { name, feedback } = req.body;
    if (!feedback || feedback.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Feedback cannot be empty' });
    }
    console.log("Received feedback:", feedback);
    console.log("name: ",name)
    // Optional: Save feedback to a database here
    const query = "INSERT INTO user_feedback (username, feedback) VALUES (?, ?)";
    db.query(query, [name, feedback], (err,results)=>{
        if(err){
            console.error('Error inserting order:', err);
            return res.status(500).json({ success: false, message: 'Failed to insert feedback in db' });
        }
        console.log('Order placed successfully:', results);
        return res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(3000, () => {
//     console.log('Server is up and running on port 3000');
// });
