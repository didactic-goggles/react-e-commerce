import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { NavLink, Link} from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import ReactStars from 'react-rating-stars-component';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import ReactImageMagnify from 'react-image-magnify';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

import { useAuthState } from '../../../../context';
import API from '../../../../api';
import LoadingIndicator from '../../../UI/LoadingIndicator';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Comments from './Comments';
const Urun = () => {
  console.log('Rendering => Urun');
  const baseURL = 'https://comfortmedikal.com/';
  // let history = useHistory();
  // const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  console.log(userDetails);
  // const starRating = useRef();
  // const [activeProductImage, setActiveProductImage] = useState(null);
  const refCarousel = useRef();
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  let { productId } = useParams();
  const starsSettings = {
    isHalf: true,
    size: 20,
    value: productInfo && productInfo.overallRating ? Math.round(Number(productInfo.overallRating) * 2) / 2 : 0,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    edit: false,
    onChange: (newValue) => {
      console.log(!!userDetails.user);
      if (!userDetails.user) {
        console.log('giriş yap');
      } else {
        console.log('uygun');
      }
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

  useEffect(() => {
    const getProductDetails = async () => {
      const getProductDetailsResponse = await API.get(
        `/products.php?product_id=${productId}`
      );
  
      const tempProductInfo = {
        product: getProductDetailsResponse.product,
        productDetails: getProductDetailsResponse.productDetails,
        categories: getProductDetailsResponse.categories,
        comments: getProductDetailsResponse.comments,
        productImages: getProductDetailsResponse.productImages,
      };
      if (getProductDetailsResponse.productImages.length > 0) {
        tempProductInfo.activeImageProduct = tempProductInfo.productImages.filter(
          (productImage) =>
            productImage.id ===
            tempProductInfo.productDetails.product_base_image_id
        )[0];
      }
  
      if (getProductDetailsResponse.comments.length > 0)
        tempProductInfo.overallRating =
          getProductDetailsResponse.comments.reduce(
            (totalRating, c2) => totalRating + Number(c2.rating),
            0
          ) / getProductDetailsResponse.comments.length;
      setProductInfo(tempProductInfo);
      setLoading(false);
    };
    getProductDetails();
  }, [productId]);

  const handleActiveProductImageChange = (productImageId) => {
    // const targetIndex = productInfo.productImages.findIndex(productImage => productImage.id === productImageId);
    // refCarousel.current.next();
    setProductInfo({
      ...productInfo,
      activeImageProduct: productInfo.productImages.filter(
        (productImage) => productImage.id === productImageId
      )[0],
    });
  };

  if (loading) return <LoadingIndicator text="Ürün Yükleniyor..." />;

  if (!productInfo) return <h5>Ürün yüklenemedi</h5>;

  return (
    <section className="container py-3">
      {productInfo.categories && (
      <div className="card card-body p-2 mb-3 rounded-0 shadow-sm d-block align-items-center">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <NavLink to="/urunler" className="text-decoration-none fw-bold" exact>
                Ürünler
              </NavLink>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to={`/urunler?categories=${productInfo.categories.categoryId}`} className="text-decoration-none fw-bold">
                {productInfo.categories.category}
              </Link>
            </li>
            {productInfo.categories.subCategoryId && (
              <li className="breadcrumb-item" aria-current="page">
                <NavLink
                  to={`/urunler?categories=${productInfo.categories.categoryId}&subCategories=${productInfo.categories.subCategoryId}`}
                  className="text-decoration-none fw-bold"
                >
                  {productInfo.categories.subCategory}
                </NavLink>
              </li>
            )}
            {productInfo.categories.childCategoryId && (
              <li className="breadcrumb-item" aria-current="page">
                <NavLink
                  to={`/urunler?categories=${productInfo.categories.categoryId}&subCategories=${productInfo.categories.subCategoryId}&childCategories=${productInfo.categories.childCategoryId}`}
                  className="text-decoration-none fw-bold"
                >
                  {productInfo.categories.childCategory}
                </NavLink>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {productInfo.product.name}
            </li>
          </ol>
        </nav>
      </div>
      )}
      <div className="row">
        <div className="col-sm-5">
          <div className="mb-2 text-center" id="zoomContainer">
            {productInfo.activeImageProduct && (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    // style: {
                    //   maxHeight: '500px'
                    // },
                    isFluidWidth: true,
                    src: `${baseURL}${productInfo.activeImageProduct.image_path}`,
                  },
                  largeImage: {
                    src: `${baseURL}${productInfo.activeImageProduct.image_path}`,
                    width: 1200,
                    height: 1800,
                  },
                  shouldUsePositiveSpaceLens: true
                }}
                style={{
                  zIndex: 100,
                  // maxHeight: '500px'
                }}
                // alt={productInfo.product.name}
                // img={`${baseURL}${productInfo.activeImageProduct.image_path}`}
                // key={productInfo.activeImageProduct.id}
                // className="img-fluid"
                // width={500}
                // height="auto"
                // style={{ maxHeight: '500px' }}
              />
              // <img
              //   alt={productInfo.product.name}
              //   src={`${baseURL}${productInfo.activeImageProduct.image_path}`}
              //   key={productInfo.activeImageProduct.id}
              //   className="img-fluid"
              //   style={{ maxHeight: '500px' }}
              // />
            )}
          </div>
          <div>
            <OwlCarousel
              // items={1}
              margin={8}
              autoplay={true}
              dots={false}
              // center={true}
              merge={true}
              // loop={true}
              // items={4}
              autoWidth={true}
              ref={refCarousel}
              // autoHeight={true}
              // ref={specialCarousel}
              // onChanged={(e) => {
              //   console.log(e)
              // }}
            >
              {productInfo.productImages.map((productImage) => (
                <img
                  alt={productInfo.product.name}
                  src={`${baseURL}${productImage.image_path}`}
                  key={productImage.id}
                  // className={productInfo.activeImageProduct.id === productImage.id ? 'img-thumbnail' : ''}
                  style={{
                    maxWidth: '60px',
                    height: '60px',
                    cursor: 'pointer',
                  }}
                  onClick={(event) => {
                    handleActiveProductImageChange(productImage.id);
                    // event.target.classList.add('img-thumbnail');
                  }}
                />
              ))}
              {/* {allProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))} */}
            </OwlCarousel>
          </div>
        </div>
        <div className="col-sm-7">
          <h5>{productInfo.product.name}</h5>
          {/* <span className="d-block mb-1">Ürün Kısa Açıklaması</span> */}
          <span className="d-block mb-1">
            Stok Durumu:{' '}
            <span
              className={`${
                productInfo.productDetails &&
                productInfo.productDetails.quantity > 0
                  ? 'text-success'
                  : 'text-danger'
              } fw-bold`}
            >
              {productInfo.productDetails &&
              productInfo.productDetails.quantity > 0
                ? 'Mevcut'
                : 'Mevcut Değil'}
            </span>
          </span>
          <div className="d-flex align-items-center mb-3">
            <span className="me-2">Ürünü Puanı: </span>
            {userDetails.user ? (
              <ReactStars {...starsSettings} />
            ) : (
              <span>
                <span data-tip data-for="infoForLogin">
                  <ReactStars {...starsSettings} />
                </span>
                <ReactTooltip
                  id="infoForLogin"
                  place="top"
                  // type="light"
                  effect="solid"
                  className="extraClass"
                  delayHide={1000}
                >
                  <div>
                    Ürünü puanlamak için{' '}
                    <NavLink to="/giris">giriş yapın</NavLink>
                  </div>
                </ReactTooltip>
              </span>
            )}
            {productInfo.comments.length > 0 ? (
              <a
                href="#comments"
                className="btn btn-link text-warning"
                onClick={(event) => {
                  event.preventDefault();
                  // document.querySelector('#comments').scrollIntoView();
                  var firstTabEl = document.querySelector('#pills-comments-tab')
                  var firstTab = new bootstrap.Tab(firstTabEl)

                  firstTab.show()
                }}
              >
                {' '}
                {productInfo.comments.length} Değerlendirme
              </a>
            ) : (
              ''
            )}
          </div>
          <div>
            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Ürün Özellikleri
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-comments-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-comments"
                  type="button"
                  role="tab"
                  aria-controls="pills-comments"
                  aria-selected="false"
                >
                  Yorumlar {productInfo.comments.length > 0 ? `(${productInfo.comments.length})` : ''}
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {(productInfo.productDetails &&
                  productInfo.productDetails.description) ||
                  'Ürün özellikleri mevcut değil'}
              </div>
              <div
                className="tab-pane fade"
                id="pills-comments"
                role="tabpanel"
                aria-labelledby="pills-comments-tab"
              >
                <Comments
                  comments={productInfo.comments}
                  userDetails={userDetails}
                  productId={productId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Urun;
