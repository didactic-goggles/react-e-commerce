import React from 'react';
import { NavLink } from 'react-router-dom';
// import ReactStars from 'react-rating-stars-component';
import Rate from 'rsuite/lib/Rate';
import {
  FaEye,
  FaHeart,
  FaRegHeart,
  // FaRegStar,
  // FaStarHalfAlt,
  // FaStar,
} from 'react-icons/fa';
import { useAuthState, useAuthDispatch, getWishList, showErrorMessage } from '../../../context';
import API from '../../../api';
import moment from 'moment';

const ProductList = (props) => {
  const baseURL = 'https://comfortmedikal.com/';
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const user = userDetails && userDetails.user;
  const { product } = props;
  let isInWishList;
  if (!user) {
    isInWishList = -1;
  } else if (
    userDetails.wishList.filter((item) => item.product_id === product.id)
      .length !== 1
  ) {
    isInWishList = 1;
  } else {
    isInWishList = 0;
  }
  // console.log(isInWishList);
  // console.log(user);
  const starsSettings = {
    allowHalf: true,
    // size: 16,
    value: Math.round(Number(product.rating) * 2) / 2 || 0,
    readOnly: true,
    onChange: (newValue) => {
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

  const handleWishList = async (event) => {
    if (isInWishList === -1) {
      showErrorMessage(dispatch, 'Lütfen öncelikle giriş yapınız');
      console.log('must be logged in');
    } else {
      try {
        if (isInWishList === 1) {
          const formData = new FormData();
          formData.append('product_id', product.id);
          formData.append('createdDate', moment().format('YYYY-MM-DD'));
          formData.append('user_id', user.id);
          const setProductInWishListResponse = await API.post(
            '/wishList.php',
            formData
          );
          if (setProductInWishListResponse) {
            getWishList(dispatch, user.id);
          }
        } else if (isInWishList === 0) {
          const formData = new FormData();
          formData.append('product_id', product.id);
          formData.append('user_id', user.id);
          formData.append('type', 'delete');
          const deleteProductInWishListResponse = await API.post(
            `/wishList.php`,
            formData
          );
          console.log(deleteProductInWishListResponse);
          if (deleteProductInWishListResponse) {
            getWishList(dispatch, user.id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="card product product-list rounded-4 w-100 border-0" key={product.id}>
      <div className="row g-0">
        <div className="col-md-4 card-image text-center">
          <img
            className="card-img-top rounded-4"
            src={
              product.productPrimaryImage
                ? `${baseURL}${product.productPrimaryImage}`
                : 'https://via.placeholder.com/150'
            }
            alt={product.name}
            onError={(event) =>
              (event.target.src = 'https://via.placeholder.com/150')
            }
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="text-start mb-2">{product.name}</h5>
            <div className="d-flex justify-content-start mb-2">
              {/* <ReactStars {...starsSettings} className="text-center" /> */}
              <Rate {...starsSettings} />
            </div>
            <div className="card-text">{product.description}</div>
            <div className="d-flex">
              <NavLink to={`/urun/${product.id}`} exact>
                <button className="btn btn-primary" type="button">
                  <FaEye />
                  <span className="d-inline ms-2">Ürünü Göster</span>
                </button>
              </NavLink>
              <button
                className="btn btn-danger ms-2"
                type="button"
                onClick={(event) => handleWishList(event)}
              >
                {isInWishList === 1 ? <FaRegHeart /> : <FaHeart />}
                <span className="d-inline ms-2">Beğendiklerime Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
