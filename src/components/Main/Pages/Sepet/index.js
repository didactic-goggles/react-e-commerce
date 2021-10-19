import { Link } from 'react-router-dom';
import './index.scss';
import Urun from './Urun';
import Bos from './Bos';
import { FaChevronLeft } from 'react-icons/fa';
const Sepet = () => {
  const cart = [
    {
      name: 'Ürün 1',
      quantity: 1,
      price: 10,
    },
    {
      name: 'Ürün 2',
      quantity: 2,
      price: 20,
    },
    {
      name: 'Ürün 3',
      quantity: 3,
      price: 30,
    },
    {
      name: 'Ürün 4',
      quantity: 4,
      price: 40,
    },
  ];
  // if (true) return <Bos />;
  return (
    <div id="cart" class="container">
      <div class="card">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="d-flex justify-content-between">
                <h4>
                  <b>Sepet</b>
                </h4>
                <div class="align-self-center text-right text-muted">
                  {cart.length} ürün
                </div>
              </div>
            </div>
            {cart.map((product) => (
              <Urun product={product} />
            ))}
            <div class="back-to-shop">
              <Link
                to="/urunler"
                className="d-flex align-items-center text-muted text-decoration-none"
              >
                <FaChevronLeft class="me-2" />
                Alışverişe Geri Dön
              </Link>
            </div>
          </div>
          <div class="col-md-4 summary">
            <div>
              <h5>
                <b>Özet</b>
              </h5>
            </div>
            <hr />
            <div class="row">
              <div class="col ps-0">
                Ürünler
              </div>
              <div class="col text-right">&#8378; 132.00</div>
            </div>
            <div class="row">
              <div class="col ps-0">
                Kargo
              </div>
              <div class="col text-right">&#8378; 0.00</div>
            </div>
            <div
              class="row"
              style={{
                'border-top': '1px solid rgba(0,0,0,.1)',
                padding: '2vh 0',
              }}
            >
              <div class="col ps-0">Toplam Tutar</div>
              <div class="col text-right">&#8378; 137.00</div>
            </div>{' '}
            <button class="btn-checkout">Siparişi Tamamla</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sepet;
