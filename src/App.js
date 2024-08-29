import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// All pages
import Home from './pages/Home';
import Contact from './pages/Contact';

import {useDocTitle} from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';
import AIRecommendation from './pages/DemoProduct';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("寰宇留学 ｜ 您贴心的留学管家");

  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/ai-recommendation" element={<AIRecommendation/>} />  */}
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}


export default App;
