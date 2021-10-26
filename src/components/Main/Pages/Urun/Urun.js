import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import ReactStars from 'react-rating-stars-component';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import ReactImageMagnify from 'react-image-magnify';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

import {
  useAuthState,
  useAuthDispatch,
  showErrorMessage,
} from '../../../../context';
import API from '../../../../api';
import LoadingIndicator from '../../../UI/LoadingIndicator';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Comments from './Comments';
import Slider from './Slider';
import SepeteEkle from './SepeteEkle';
const Urun = () => {
  console.log('Rendering => Urun');
  const baseURL = 'https://comfortmedikal.com/';
  // let history = useHistory();
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  // console.log(userDetails);
  // const starRating = useRef();
  // const [activeProductImage, setActiveProductImage] = useState(null);
  const refCarousel = useRef();
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastVisitedProducts, setLastVisitedProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  let { productId } = useParams();
  const starsSettings = {
    isHalf: true,
    size: 20,
    value:
      productInfo && productInfo.overallRating
        ? Math.round(Number(productInfo.overallRating) * 2) / 2
        : 0,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    edit: false,
    onChange: (newValue) => {
      // console.log(!!userDetails.user);
      if (!userDetails.user) {
        showErrorMessage(dispatch, 'Lütfen öncelikle giriş yapınız');
      } else {
        console.log('uygun');
      }
      // console.log(`Example 2: new value is ${newValue}`);
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProductDetails = async () => {
      const getProductDetailsResponse = await API.get(
        `/products.php?product_id=${productId}`
      );

      const currentProduct = userDetails.products.filter(
        (p) => p.id === productId
      )[0];
      if (currentProduct) {
        // Set Last Visited Products
        if (localStorage) {
          if (localStorage.getItem('comfort-visited-products')) {
            const products = JSON.parse(
              localStorage.getItem('comfort-visited-products')
            ).products;
            const productIndex = products.findIndex(
              (p) => p.id === currentProduct.id
            );
            // console.log(productIndex);
            if (productIndex === -1) {
              products.push(currentProduct);
              localStorage.setItem(
                'comfort-visited-products',
                JSON.stringify({
                  products,
                })
              );
            }
            setLastVisitedProducts(
              products
                .filter((p) => p.id !== currentProduct.id)
                .reverse()
                .slice(0, 7)
            );
          } else {
            localStorage.setItem(
              'comfort-visited-products',
              JSON.stringify({
                products: [currentProduct],
              })
            );
            // setLastVisitedProducts(products);
          }
        }
        // Set Suggested Products
        console.log(currentProduct);
        const tempSuggestedProducts = [];
        let sameSizeCount = 0;
        let sameBrandCount = 0;
        let maxSameSizeCount = 2;
        let maxSameBrandCount = 2;
        const filterCategoryMode = currentProduct.childCategory
          ? 'childCategory'
          : currentProduct.subCategory
          ? 'subCategory'
          : 'category';
        const filterBrandMode = currentProduct.subBrand ? 'subBrand' : 'brand';
        userDetails.products.forEach((p) => {
          if (p.id !== currentProduct.id) {
            if (
              p[filterCategoryMode] === currentProduct[filterCategoryMode] &&
              p[filterBrandMode] !== currentProduct[filterBrandMode] &&
              sameSizeCount < maxSameSizeCount
            ) {
              tempSuggestedProducts.push(p);
              sameSizeCount++;
            } else if (
              p[filterCategoryMode] === currentProduct[filterCategoryMode] &&
              (p.size ? p.size !== currentProduct.size : true) &&
              p[filterBrandMode] === currentProduct[filterBrandMode] &&
              sameBrandCount < maxSameBrandCount
            ) {
              tempSuggestedProducts.push(p);
              sameBrandCount++;
            }
          }
        });
        if (sameBrandCount < maxSameBrandCount) {
          maxSameSizeCount = 6 - sameBrandCount;
          userDetails.products
            .filter(
              (p) =>
                tempSuggestedProducts.findIndex((fp) => fp.id === p.id) ===
                  -1 && p.id !== currentProduct.id
            )
            .forEach((p) => {
              if (
                p[filterCategoryMode] === currentProduct[filterCategoryMode] &&
                p[filterBrandMode] !== currentProduct[filterBrandMode] &&
                sameSizeCount < maxSameSizeCount
              ) {
                tempSuggestedProducts.push(p);
                sameSizeCount++;
              }
            });
        }
        setSuggestedProducts(tempSuggestedProducts);
      }

      const tempProductInfo = {
        product: getProductDetailsResponse.product,
        productDetails: getProductDetailsResponse.productDetails,
        categories: getProductDetailsResponse.categories,
        comments: getProductDetailsResponse.comments,
        productImages: getProductDetailsResponse.productImages,
      };
      if (getProductDetailsResponse.productImages.length > 0) {
        tempProductInfo.activeImageProduct =
          tempProductInfo.productImages.filter(
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
      // setSliders();
      setLoading(false);
    };
    getProductDetails();
  }, [productId, userDetails]);

  const handleActiveProductImageChange = (productImageId) => {
    setProductInfo({
      ...productInfo,
      activeImageProduct: productInfo.productImages.filter(
        (productImage) => productImage.id === productImageId
      )[0],
    });
  };

  if (loading) return <LoadingIndicator text="Ürün Yükleniyor..." />;

  if (!productInfo) return <h5>Ürün yüklenemedi</h5>;

  const ProductImagesCarousel = () => {
    if (!productInfo.productImages || productInfo.productImages.length === 0)
      return <div></div>;
    return (
      <OwlCarousel
        key={productId}
        margin={8}
        autoplay={true}
        dots={false}
        merge={true}
        autoWidth={true}
        ref={refCarousel}
      >
        {productInfo.productImages.map((productImage) => (
          <img
            alt={productInfo.product.name}
            src={`${baseURL}${productImage.image_path}`}
            key={productImage.id}
            style={{
              maxWidth: '60px',
              height: '60px',
              cursor: 'pointer',
            }}
            onClick={(event) => {
              handleActiveProductImageChange(productImage.id);
            }}
          />
        ))}
      </OwlCarousel>
    );
  };
  // console.log(productInfo);
  const ProductDetails = () => {
    if (!productInfo.productDetails || !productInfo.productDetails.description)
      return <div>Ürün özellikleri mevcut değil</div>;
    return (
      <ul>
        {productInfo.productDetails.description
          .split('\r\n')
          .filter((item) => item !== '')
          .map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    );
  };

  return (
    <section className="container py-3">
      {productInfo.categories && (
        <div className="card card-body p-2 mb-3 shadow-sm d-block align-items-center">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <NavLink
                  to="/urunler"
                  className="text-decoration-none fw-bold"
                  exact
                >
                  Ürünler
                </NavLink>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link
                  to={`/urunler?categories=${productInfo.categories.categoryId}`}
                  className="text-decoration-none fw-bold"
                >
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
      <div className="card shadow">
        <div className="card-body p-0">
          <div className="row mx-0">
            <div className="col-sm-5 py-3">
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
                      shouldUsePositiveSpaceLens: true,
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
                <ProductImagesCarousel />
              </div>
            </div>
            <div className="col-sm-7 d-flex flex-column bg-light py-3 px-3">
              <h4 className="fw-bold text-primary">
                {productInfo.productDetails.sub_title}
              </h4>
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
                      var firstTabEl = document.querySelector(
                        '#pills-comments-tab'
                      );
                      var firstTab = new bootstrap.Tab(firstTabEl);

                      firstTab.show();
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
                      Yorumlar{' '}
                      {productInfo.comments.length > 0
                        ? `(${productInfo.comments.length})`
                        : ''}
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    // style={{
                    //   whiteSpace: 'pre-line',
                    // }}
                  >
                    <ProductDetails />
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
              <div className="mt-auto mb-5">
                <SepeteEkle product={productInfo} userDetails={userDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <Slider products={lastVisitedProducts} title="Son Gezdiğiniz Ürünler" />
      </div>
      <div className="mb.-2">
        <Slider products={suggestedProducts} title="Önerilen Ürünler" />
      </div>
    </section>
  );
};

export default Urun;
