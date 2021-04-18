import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import {
  FaEye,
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaStarHalfAlt,
  FaStar,
} from 'react-icons/fa';
import {useAuthState, useAuthDispatch, getWishList} from '../../../context';
import API from '../../../api';
import moment from 'moment';

const Product = (props) => {
  const baseURL = 'https://comfortmedikal.com/';
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const user = userDetails && userDetails.user;
  const { product } = props;
  let isInWishList;
  if(!user) {
    isInWishList = -1;
  } else if(userDetails.wishList.filter(item => item.product_id === product.id).length !== 1) {
    isInWishList = 1;
  } else {
    isInWishList = 0;
  }
  console.log(isInWishList);
  // console.log(user);
  const starsSettings = {
    isHalf: true,
    size: 16,
    value: Math.round(Number(product.rating) * 2) / 2 || 0,
    edit: false,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    onChange: (newValue) => {
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

  const handleWishList = async (event) => {
    if(isInWishList === -1) {
      console.log('must be logged in')
    } else {
      try {
        if(isInWishList === 1) {
          const formData = new FormData();
          formData.append('product_id', product.id);
          formData.append('createdDate', moment().format('YYYY-MM-DD'));
          formData.append('user_id', user.id);
          const setProductInWishListResponse = await API.post('/wishList.php', formData);
          if(setProductInWishListResponse) { 
            getWishList(dispatch, user.id);
          }
        } else if(isInWishList === 0) {
          const formData = new FormData();
          formData.append('product_id', product.id);
          formData.append('user_id', user.id);
          formData.append('type', 'delete');
          const deleteProductInWishListResponse = await API.post(`/wishList.php`, formData);
          console.log(deleteProductInWishListResponse);
          if(deleteProductInWishListResponse) { 
            getWishList(dispatch, user.id);
          }
        }
        
      } catch (error) {
        console.log(error);
      }

    }
  };

  return (
    <div className="card rounded-lg w-100 border-0" key={product.id}>
      <div
        className="card-image bg-transparent"
        style={{ borderRadius: '1rem' }}
      >
        <img
          className="card-img-top"
          style={{ borderRadius: '1rem' }}
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
        <div className="image-overlay py-2">
          <div className="d-flex justify-content-center align-items-center flex-column h-100">
            <NavLink to={`/urun/${product.id}`} exact>
              <button className="btn btn-primary btn-circle mb-2" type="button">
                <FaEye />
                {/* <span className="d-inline d-md-none">Ürünü Göster</span> */}
              </button>
            </NavLink>
            <button
              className="btn btn-danger btn-circle"
              type="button"
              onClick={(event) => handleWishList(event)}
            >{
              isInWishList === 1 ? <FaRegHeart /> : <FaHeart />
            }
              
              {/* Beğendiklerime Ekle */}
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="text-center">{product.name}</h5>
        <div className="d-flex justify-content-center">
          <ReactStars {...starsSettings} className="text-center" />
        </div>
        <div className="card-text">{product.description}</div>
      </div>
    </div>
  );
};

export default Product;
