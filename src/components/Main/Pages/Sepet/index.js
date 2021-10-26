import { Link } from 'react-router-dom';
import './index.scss';
import Urun from './Urun';
import Bos from './Bos';
import API from '../../../../api';

import { FaChevronLeft } from 'react-icons/fa';
import {
  useAuthDispatch,
  useAuthState,
  removeProduct,
  addProduct,
} from '../../../../context';

const Sepet = () => {
  const dispatch = useAuthDispatch();
  const store = useAuthState();
  const cart = store.cart;

  const handleCreateOrder = async () => {
    // const formData = new FormData();
    // cart.forEach((cartItem, index) => {
    //   console.log(cartItem);
    //   formData.append(`products[${index}][product_id]`, cartItem.product.id);
    //   formData.append(`products[${index}][quantity]`, cartItem.quantity);

    // });
    // formData.append('user_id', 4);
    const body = {
      products: cart.map(p => ({product_id: p.product.id, quantity: p.quantity}))
    }
    const createOrderResponse = await API.post('createorder.php', body);

    // console.log(formData);
    console.log(createOrderResponse);
  }
  if (cart.length < 1) return <Bos />;
  return (
    <div id="cart" className="container mt-5">
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="d-flex justify-content-between">
                <h4>
                  <b>Sepet</b>
                </h4>
                <div className="align-self-center text-right text-muted">
                  {cart.length} ürün
                </div>
              </div>
            </div>
            {cart.map((product) => (
              <Urun
                product={product}
                dispatch={dispatch}
                removeProduct={removeProduct}
                addProduct={addProduct}
                key={product.product.id}
              />
            ))}
            <div className="back-to-shop">
              <Link
                to="/urunler"
                className="d-flex align-items-center text-muted text-decoration-none"
              >
                <FaChevronLeft className="me-2" />
                Alışverişe Geri Dön
              </Link>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Özet</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col ps-0">Ürünler</div>
              <div className="col text-right">
                &#8378;
                {cart.reduce(
                  (sum, p) => Number(p.productDetails.price) * p.quantity + sum,
                  0
                )}
              </div>
            </div>
            <div className="row">
              <div className="col ps-0">Kargo</div>
              <div className="col text-right">&#8378; 0.00</div>
            </div>
            <div
              className="row"
              style={{
                borderTop: '1px solid rgba(0,0,0,.1)',
                padding: '2vh 0',
              }}
            >
              <div className="col ps-0">Toplam Tutar</div>
              <div className="col text-right">&#8378;{cart.reduce(
                  (sum, p) => Number(p.productDetails.price) * p.quantity + sum,
                  0
                )}</div>
            </div>{' '}
            <button className="btn-checkout" onClick={handleCreateOrder}>Siparişi Tamamla</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sepet;
