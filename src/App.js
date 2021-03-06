import React from 'react';
import './assets/css/main.css';
import './assets/js/index';
import { BrowserRouter as Router } from 'react-router-dom';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { AuthProvider } from './context';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer';

const App = () => {
  // const scrollElement = useRef();
  // setTimeout(
  //   () => (scrollElement ? (window.scrollElement = scrollElement.current) : ''),
  //   1000
  // );

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Main />
        <Footer />
        {/* <PerfectScrollbar ref={scrollElement}>
          <Header />
          <Main />
          <Footer />
        </PerfectScrollbar> */}
      </Router>
    </AuthProvider>
  );
};

export default App;
