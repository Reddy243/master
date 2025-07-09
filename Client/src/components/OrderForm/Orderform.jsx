import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Orderform.css';
import { UserContext } from '../../UserContext'; // Import UserContext

function Orderform() {
  //const url = "http://localhost:3000";
  const url = "https://node-backend-q1yo.onrender.com";
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, SetRole] = useState('user'); // Default to 'user'

  // Access the global context to update the name
  const { setUserName } = useContext(UserContext); 

  // Order form fields
  const [customerName, setCustomerName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isOrderComfirm, setOrderConfirm] = useState(false);

  // State for holding order data for admin dashboard
  const [orders, setOrders] = useState([]);

  // Fetch orders when logged in as admin
  {/* useEffect(() => {
    if (role === 'admin') {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`${url}/api/Orders`);
          const data = await response.json();
          if (data.success) {
            console.log(data.message);
            setOrders(data.orders);
          } else {
            setError('Failed to fetch orders');
          }
        } catch (error) {
          setError('An error occurred while fetching orders.');
        }
      };
      fetchOrders();
    }
  }, [role]); */}

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/Orders`);
      console.log("response", response);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      setError('An error occurred while fetching orders.');
    }
  };
  useEffect(() => {
    if (role === 'admin') {
      fetchOrders();
    }
  }, [role]);


  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${url}/api/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsLoggedIn(true); // Show order form after login
        setUserName(name);
        SetRole(data.role === 'admin' ? 'admin' : 'user');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Order submit handler
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    //alert(`Order Placed!\n\nName: ${customerName}\nNumber: ${number}\nAddress: ${address}\nAmount: ${amount}`);
    try {
      const response = await fetch(`${url}/api/Orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerName, number, address, amount }),
      });
      console.log("response: "+response);
      const data = await response.json();
      console.log("data: "+data+Object.keys(data)+data.message+" : "+data.success);
      if (response.ok && data.success) {
        setOrderConfirm(true); // Show order confirmation
      } else {
        alert("HI");
        setError(data.message || 'Failed to place order');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  function viewCustomerOrders(id, mobile) {
    console.log("Customer Id:", id, "Mobile:", mobile);
    const updateOrderStatus = async () => {
      try {
        const response = await fetch(`${url}/api/Orders`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerName: id, number: mobile })
        });
        const data = await response.json();
        if (response.ok) {
          console.log("Response:", data.message || 'Order updated successfully');
          // Optional: Refresh the orders list or give user feedback
          fetchOrders();
        } else {
          console.error('Failed to update order:', data.message);
        }
      } catch (e) {
        console.error('Error updating order:', e);
      }
    };
    updateOrderStatus();
  }

  
  return (
    <div className={role === 'admin' ? "admin_orderForm" : "orderForm"}>
      {/* Login Form */}
      {!isLoggedIn ? (
        <>
          <h4>To Order, Please Login..</h4>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                id="userName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group center">
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="form-group center">
              <span>
                Don't have an account? <Link to="/signup">Signup Now!</Link>
              </span>
            </div>
          </form>
        </>
      ) : (
        // If the user is logged in, render content based on their role
        role === 'admin' ? (
          <div className="admin-dashboard">
            <h3>Admin Dashboard</h3>
            <p>Welcome, Admin! You have full access to manage the orders and users.</p>
            {error && <div className="error-message">{error}</div>}
            <label> List of Orders </label>
            <table id="OrderTable">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>No Of Orders</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.customerName}</td>
                      <td>{order.number}</td>
                      <td>{order.noOfOrders}</td>
                      <td>{order.paymentStatus || 'In Progress'}</td>
                      <td>{order.orderStatus || 'Pending'}</td>
                      <td>
                        <button className={order.orderStatus === 'Completed'? 'order_Completed':''} onClick={() => viewCustomerOrders(order.customerName, order.number)} disabled={order.orderStatus === 'Completed'}>Complete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // If not admin, show order form or confirmation
          !isOrderComfirm ? (
            <>
              <h2>Order Here!</h2>
              <h4>Welcome! Place your order below:</h4>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleOrderSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>No of Copies: </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group center">
                  <button type="submit">Pay Now!</button>
                </div>
              </form>
            </>
          ) : (
            <div className="orderConfirmed">
              <h2>Order Confirmed!</h2>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Orderform;
