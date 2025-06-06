import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navigator from './components/Navigator/Navigator.jsx';
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage.jsx';
import Address from './components/Address/Address.jsx';
import Contact from './components/Contact/Contact.jsx';
import Slideshow from './components/SlideShow/Slideshow.jsx';
import Orderform from './components/OrderForm/Orderform.jsx';
import Signup from './components/Signup/Signup.jsx';
import Feedback from './components/Feedback/Feedback.jsx';
import Shop from '/images/shop.svg';

function App() {
  return (
    <>
      <header>
        <div className="header-container">
          <h1 id="mainTitle">Sri Sai Durga Printing Press</h1>
          <div className="shopLogo">
            <img src={Shop} alt="ShopLogo" />
          </div>
        </div>
      </header>

      <Navigator />

      <section>
        <Routes>
          <Route path="/" element={<><WelcomeMessage /><Slideshow /></>} />
          <Route path="/order" element={<Orderform />} />
          <Route path="/address" element={<Address />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </section>

      <footer>
        <h5 id="footer">All rights reserved @2025</h5>
      </footer>
    </>
  );
}

export default App;
