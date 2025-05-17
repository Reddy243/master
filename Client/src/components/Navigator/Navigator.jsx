import { Link } from 'react-router-dom';
import './Navigator.css';

function Navigator() {
  return (
    <nav className="Navigator">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/address">Address</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/feedback">Feedback</Link></li> {/* You can create a route later for feedback if needed */}
      </ul>
    </nav>
  );
}

export default Navigator;
