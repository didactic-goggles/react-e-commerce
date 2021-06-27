import React, { useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Product from '../../../UI/Product/Product';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Slider = (props) => {
  console.log('Rendering => ProductsSlider');
  const { products, title } = props;
  console.log(products);
  const carousel = useRef();

  const carouselOptions = {
    items: 4,
    margin: 16,
    autoplay: true,
    dots: false,
    loop: true,
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

  if (products.length === 0) {
    return <div></div>;
  }

  const sliderNavClickHandler = (isPrev) => {
    isPrev ? carousel.current.prev() : carousel.current.next();
  };

  return (
    <div id="productSlider">
      <ul className="nav mb-3">
        <h4>{title}</h4>
        <li className="ms-auto">
          <button
            className="btn btn-primary btn-circle me-2 btn-icon no-active"
            onClick={() => sliderNavClickHandler(true)}
          >
            <FaChevronLeft />
          </button>
          <button
            className="btn btn-primary btn-circle btn-icon no-active"
            onClick={() => sliderNavClickHandler(false)}
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
      <div>
        {products.length > 0 ? (
          <OwlCarousel {...carouselOptions} ref={carousel}>
            {products &&
              products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
          </OwlCarousel>
        ) : (
          <h5>Ürünler bulunamadı</h5>
        )}
      </div>
    </div>
  );
};

export default Slider;
