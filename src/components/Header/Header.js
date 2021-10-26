/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
// import ReactCountryFlag from 'react-country-flag';
import {
  // FaGlobeEurope,
  FaUserAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCog,
  FaHeart,
  FaEnvelope,
  FaPhoneAlt,
  FaShoppingCart,
} from 'react-icons/fa';
import { useAuthDispatch, logout, useAuthState } from '../../context';
import Navbar from './Navbar';

const Header = () => {
  console.log('Rendering => Header');
  let history = useHistory();
  const dispatch = useAuthDispatch();
  const store = useAuthState();
  const handleLogout = () => {
    logout(dispatch);
    history.push('/');
  };

  return (
    <header>
      <div className="border-bottom d-none d-md-block">
        <nav className="navbar navbar-dark container py-0 px-0">
          <div className="border-end px-2">
            <a
              href="mailto:info@comfortmedikal.com"
              className="text-decoration-none text-dark text-lowercase"
            >
              <FaEnvelope className="me-2" />
              info@comfortmedikal.com
            </a>
          </div>
          <div className="px-2 ms-2 me-auto">
            <a
              href="tel:+902126359451"
              className="text-decoration-none text-dark"
            >
              <FaPhoneAlt className="me-2" />
              <span>212 635 94 51</span>
            </a>
          </div>
          <div className="d-flex">
            <div className="dropdown me-2">
              <a
                className="btn dropdown-toggle d-flex align-items-center border-end"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserAlt className="me-2" />
                {store.user ? `Hoşgeldiniz, ${store.user.username}` : 'Hesabım'}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuLink"
              >
                {store.user ? (
                  <>
                    <li>
                      <Link to="/hesabim" className="dropdown-item">
                        <FaUserCog className="me-2" />
                        Hesap Ayarları
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/cikis"
                        onClick={(event) => {
                          event.preventDefault();
                          handleLogout();
                        }}
                      >
                        <FaSignOutAlt className="me-2" />
                        Çıkış
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/giris" className="dropdown-item">
                      <FaSignInAlt className="me-2" />
                      Giriş Yap
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <Link className="btn border-end" to="/begendiklerim">
              <FaHeart className="me-2 text-danger" />
              {/* Beğendiklerim */}
            </Link>
            {store.cart && store.cart.length > 0 && (
              <Link className="btn border-end" to="/sepet">
                <FaShoppingCart className="me-2 text-primary" />
                {store.cart.length}
              </Link>
            )}

            {/* <div className="dropdown">
              <a
                className="btn dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaGlobeEurope className="me-2" />
                Dil
              </a>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="#">
                    <ReactCountryFlag
                      countryCode="TR"
                      svg
                      style={{
                        width: '1.5em',
                        height: '1.5em',
                      }}
                      className="me-2"
                      title="TR"
                    />
                    Türkçe
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <ReactCountryFlag
                      countryCode="US"
                      svg
                      style={{
                        width: '1.5em',
                        height: '1.5em',
                      }}
                      className="me-2"
                      title="US"
                    />
                    English (not available)
                  </a>
                </li>
              </ul>
            </div> */}
            {/* <div className="dropdown">

                        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                            aria-labelledby="dropdownMenuLink">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div> */}
            {/* <div className="mr-3">
                        <i className="bi bi-telephone mr-1"></i>
                        <span>+90 555 4443322</span>
                    </div>
                    <div>
                        <i className="bi bi-envelope mr-1"></i>
                        <span>mail@mail.com</span>
                    </div> */}
          </div>
          {/* <div className="d-flex align-items-center">
                    <a className="mr-2" href="#"><i className="bi bi-instagram"></i></a>
                    <a className="mr-2" href="#"><i className="bi bi-facebook"></i></a>
                    <a className="mr-2" href="#"><i className="bi bi-youtube"></i></a>
                    <form>
                        <div>
                            <input type="search" className="form-control form-control-sm" placeholder="Site içi arama" />
                        </div>
                    </form>
                </div> */}
        </nav>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
