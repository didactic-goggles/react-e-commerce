import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaMapMarked, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="bg-dark mt-auto text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-md-2 border-right-md border-sm-0 flex-fill d-flex align-items-center justify-content-center mb-3"
            ref={(el) =>
              el &&
              el.style.setProperty('border-color', '#6c757d3d', 'important')
            }
          >
            <img src='https://comfortmedikal.com/img/logo/comfort-logo-white.jpg' alt='Comfort Medikal İstanbul' className='header-logo'/>
          </div>
          <div
            className="col-md-5 border-right-md border-sm-0 flex-fill mb-3"
            ref={(el) =>
              el &&
              el.style.setProperty('border-color', '#6c757d3d', 'important')
            }
          >
            <ul className="nav flex-row">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  Anasayfa
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/kurumsal" className="nav-link text-white">
                  Kurumsal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/urunler" className="nav-link text-white">
                  Ürünler
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/diger" className="nav-link text-white">
                  Diğer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/iletisim" className="nav-link text-white">
                  İletişim
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-5">
            <div className="d-flex flex-column">
              <span className="mb-2">
                <FaMapMarked className="me-2" style={{ fontSize: '25px' }} />{' '}
                Adres: Molla Gürani Mahallesi Emin Ali Yasin Sk. No: 3 34093 Fatih/İstanbul
              </span>
              <span className="mb-2">
                <FaPhoneAlt className="me-2" style={{ fontSize: '25px' }} />{' '}
                Telefon: 555 555 55 55
              </span>
              <span>
                <FaEnvelope className="me-2" style={{ fontSize: '25px' }} />{' '}
                <a href="mailto:info@comfortmedikal.com" class="text-decoration-none text-white">info@comfortmedikal.com</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
