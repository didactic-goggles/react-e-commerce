// import axios from 'axios';
import React, { useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import API from '../../../../api';
// import LoadingIndicator from '../../../UI/LoadingIndicator';
import Product from '../../../UI/Product/Product';

import { useAuthState } from '../../../../context';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ProductsSlider = (props) => {
  console.log('Rendering => ProductsSlider');
  const { mode } = props;
  const userDetails = useAuthState();
  const carousel = useRef();

  const carouselOptions = {
    items: 4,
    margin: 8,
    autoplay: true,
    dots: false,
    lazyLoad: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  if (userDetails.products.length === 0) {
    return <h5>Ürünler Yüklenemedi</h5>;
  }

  const sliderNavClickHandler = (isPrev) => {
    isPrev ? carousel.current.prev() : carousel.current.next();
  };

  const filteredProductsByMode = userDetails.products.filter((product) => product.subCategory === mode);
  return (
    <div id="productSlider">
      <ul className="nav mb-3">
        <h4>{mode}</h4>
        <li className="ms-auto">
          <button
            className="btn btn-primary btn-circle me-2 btn-icon"
            onClick={() => sliderNavClickHandler(true)}
          >
            <FaChevronLeft />
          </button>
          <button
            className="btn btn-primary btn-circle btn-icon"
            onClick={() => sliderNavClickHandler(false)}
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
      <div>
        {
          filteredProductsByMode.length > 1 ?
          <OwlCarousel {...carouselOptions} ref={carousel}>
          {userDetails.products && filteredProductsByMode.map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </OwlCarousel> : <h5>Ürünler bulunamadı</h5>
        }
        
      </div>
    </div>
  );
};

export default ProductsSlider;
