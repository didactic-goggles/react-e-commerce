import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaMapMarked, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="bg-dark mt-auto text-white py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <h5>Logo</h5>
          </div>
          <div className="col-md-4">
            <ul className="nav flex-column">
              <li className="nav-item px-3">
                <h5>Linkler</h5>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  Anasayfa
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  Kurumsal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  Ürünler
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  Diğer
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="d-flex flex-column">
              <span className="mb-2">
                <FaMapMarked className="me-2" style={{fontSize: '25px'}}/> Adres: Ssdsdsd SDSDSDsd sdsds
              </span>
              <span className="mb-2">
                <FaPhoneAlt className="me-2" style={{fontSize: '25px'}}/> Telefon: 555 555 55 55
              </span>
              <span>
                <FaEnvelope className="me-2" style={{fontSize: '25px'}}/> E-posta: mail@mail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
