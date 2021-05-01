import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../context';

import Product from '../UI/Product/Product';

const WishList = () => {
  const userDetails = useAuthState();
  const filteredProducts = userDetails.products.filter(
    (product) =>
      userDetails.wishList.findIndex(
        (wishListItem) => wishListItem.product_id === product.id
      ) !== -1
  );
  if (!userDetails.user) {
    return (
      <section className="container my-3">
        <h5 className="text-center my-5">
          Beğendiğiniz ürünleri görmek için lütfen{' '}
          <br />
          <Link to="/giris" className="d-block mt-3">giriş yapın</Link>
        </h5>
      </section>
    );
  }
  if (userDetails.wishList.length === 0) {
    return <h5 className="text-center my-5">Listeniz şu an boş.</h5>;
  }
  return (
    <section className="container my-3">
      <div className="card shadow-sm">
        <div className="card-body">

          <h3 className="mb-4">Beğendiğim Ürünler</h3>
          <div className="row">
            {filteredProducts.length < 1 ? (
              <>
                <h5>Listeniz şu an boş.</h5>
              </>
            ) : (
              filteredProducts.map((product) => (
                <div className="col-md-3 mb-2" key={product.id}>
                  <Product product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishList;
