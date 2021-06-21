// import axios from 'axios';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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
  const { category, subCategory, childCategory } = props;
  const userDetails = useAuthState();
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

  if (userDetails.products.length === 0) {
    return <h5>Ürünler Yüklenemedi</h5>;
  }

  const sliderNavClickHandler = (isPrev) => {
    isPrev ? carousel.current.prev() : carousel.current.next();
  };

  let subCategoryId;
  let childCategoryId;
  const filteredProductsBrands = [];
  const filteredProductsByMode = [];
  userDetails.products.forEach((product) => {
    if (
      product.category === category &&
      !filteredProductsBrands.includes(product.subBrand || product.brand) &&
      (product.subCategory !== '' && subCategory ? product.subCategory === subCategory : true) &&
      (product.childCategory !== '' && childCategory ? product.childCategory === childCategory : true)
    ) {
      subCategoryId = product.subCategoryId;
      childCategoryId = product.childCategoryId;
      filteredProductsByMode.push(product);
      filteredProductsBrands.push(product.subBrand || product.brand);
    }
  });

  return (
    <div id="productSlider">
      <ul className="nav mb-3">
        <h4>{childCategory || subCategory || category}</h4>
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
        {filteredProductsByMode.length > 1 ? (
          <OwlCarousel {...carouselOptions} ref={carousel}>
            {userDetails.products &&
              filteredProductsByMode.map((product) => (
                <Product product={product} key={product.id} />
              ))}
          </OwlCarousel>
        ) : (
          <h5>Ürünler bulunamadı</h5>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <Link
          className="btn btn-link"
          to={`/urunler?categories=2&subCategories=${subCategoryId}${childCategory ? `&childCategories=${childCategoryId}` : ''}`}
        >
          Tümünü Gör
        </Link>
      </div>
    </div>
  );
};

export default ProductsSlider;
