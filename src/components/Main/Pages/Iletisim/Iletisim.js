import React from 'react';
import { FaMapMarked, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Iletisim = () => {
  return (
    <section className="container py-3">
      <div className="row">
        <div className="col-md-6">
          <img src='https://comfortmedikal.com/img/logo/comfort-logo-white.jpg' alt='Comfort Medikal İstanbul' className='header-logo'/>
          <h5>
            COMFORT MEDİKAL SAĞLIK ÜRÜNLERİ A.Ş.
          </h5>
          <span className="d-flex align-items-center mb-2">
            <FaMapMarked className="me-2" />
            <span>
              Adres: Molla Gürani Mahallesi Emin Ali Yasin Sk. No: 3 34093 Fatih/İstanbul
            </span>
          </span>
          <span className="d-flex align-items-center mb-2">
            <FaPhoneAlt className="me-2" />
            <span>555 4545 554</span>
          </span>
          <span className="d-flex align-items-center mb-2">
            <a
              href="mailto:info@comfortmedikal.com"
              className="text-decoration-none text-dark"
            >
              <FaEnvelope className="me-2" /> <span>info@comfortmedikal.com</span>
            </a>
          </span>
        </div>
        <div className="col-md-6">
          <iframe
            title="Comfort Medikal"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1177.6197478085871!2d28.939961943449102!3d41.01260935533916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba30222400cf%3A0xd332841ba408c0a2!2sPlatin%20Medikal!5e0!3m2!1str!2str!4v1617829777197!5m2!1str!2str"
            // width="600"
            height="450"
            style={{ border: '0', width: '100%' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Iletisim;
