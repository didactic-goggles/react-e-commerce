import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaMapMarked, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="bg-dark mt-auto text-white py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-center">
          <div
            className="border-right-md border-sm-0 flex-fill px-3 d-flex align-items-center mb-3"
            ref={(el) =>
              el &&
              el.style.setProperty('border-color', '#6c757d3d', 'important')
            }
          >
            <h5>Logo</h5>
          </div>
          <div
            className="border-right-md border-sm-0 flex-fill px-0 px-md-3 mb-3"
            ref={(el) =>
              el &&
              el.style.setProperty('border-color', '#6c757d3d', 'important')
            }
          >
            <h5 className="px-3">Linkler</h5>
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
          <div className="flex-fill px-3">
            <div className="d-flex flex-column">
              <span className="mb-2">
                <FaMapMarked className="me-2" style={{ fontSize: '25px' }} />{' '}
                Adres: Ssdsdsd SDSDSDsd sdsds
              </span>
              <span className="mb-2">
                <FaPhoneAlt className="me-2" style={{ fontSize: '25px' }} />{' '}
                Telefon: 555 555 55 55
              </span>
              <span>
                <FaEnvelope className="me-2" style={{ fontSize: '25px' }} />{' '}
                E-posta: mail@mail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
