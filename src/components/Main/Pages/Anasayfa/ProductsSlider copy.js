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

const ProductsSlider = () => {
  console.log('Rendering => ProductsSlider');
  const userDetails = useAuthState();
  // const [loading, setLoading] = useState(true);
  // const [allProducts, setAllProducts] = useState([]);
  const specialCarousel = useRef();
  const latestCarousel = useRef();
  const mostLikedCarousel = useRef();
  // const [activeCarousel, setActiveCarousel] = useState('special');
  let activeCarousel = 'special';
  const carouselOptions = {
    items: 4,
    margin: 8,
    autoplay: true,
    dots: false,
    lazyLoad : true,
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
  // useEffect(() => {
  //   console.log('Start');
  //   const getProducts = async () => {
  //     const allProducts = userDetails.products;
  //     // const getAllProductsResponse = await API.get('products.php');
  //     if(allProducts.length > 0) {
  //       setAllProducts(allProducts);
  //       setLoading(false);
  //       console.log('Finish');
  //     } else {
  //       setLoading(false);
  //       setAllProducts([]);
  //     }
  //   };
  //   getProducts();
  // }, []);

  // if(loading) {
  //   return <LoadingIndicator text="Ürünler Yükleniyor..." />;
  // }

  if (userDetails.products.length === 0) {
    return <h5>Ürünler Yüklenemedi</h5>;
  }

  const sliderNavClickHandler = (isPrev) => {
    if (activeCarousel === 'special') {
      isPrev ? specialCarousel.current.prev() : specialCarousel.current.next();
    } else if (activeCarousel === 'latest') {
      isPrev ? latestCarousel.current.prev() : latestCarousel.current.next();
    } else if (activeCarousel === 'mostLiked') {
      isPrev
        ? mostLikedCarousel.current.prev()
        : mostLikedCarousel.current.next();
    }
  };

  return (
    <div id="productSlider">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-special-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-special"
            type="button"
            role="tab"
            aria-controls="pills-special"
            aria-selected="true"
            // onClick={() => setActiveCarousel('special')}
            onClick={() => (activeCarousel = 'special')}
          >
            Size Özel
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-mostLiked-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-mostLiked"
            type="button"
            role="tab"
            aria-controls="pills-mostLiked"
            aria-selected="false"
            onClick={() => (activeCarousel = 'mostLiked')}
          >
            En Çok Tercih Edilenler
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-latest-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-latest"
            type="button"
            role="tab"
            aria-controls="pills-latest"
            aria-selected="false"
            onClick={() => (activeCarousel = 'latest')}
          >
            En Son Eklenenler
          </button>
        </li>
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
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-special"
          role="tabpanel"
          aria-labelledby="pills-special-tab"
        >
          <OwlCarousel {...carouselOptions} ref={specialCarousel}>
            {userDetails.products &&
              userDetails.products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
          </OwlCarousel>
        </div>
        <div
          className="tab-pane fade"
          id="pills-mostLiked"
          role="tabpanel"
          aria-labelledby="pills-mostLiked-tab"
        >
          <OwlCarousel {...carouselOptions} ref={mostLikedCarousel}>
            {userDetails.products &&
              userDetails.products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
          </OwlCarousel>
        </div>
        <div
          className="tab-pane fade"
          id="pills-latest"
          role="tabpanel"
          aria-labelledby="pills-latest-tab"
        >
          <OwlCarousel {...carouselOptions} ref={latestCarousel}>
            {userDetails.products &&
              userDetails.products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
