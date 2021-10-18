import './index.scss';
import Urun from './Urun';
import Bos from './Bos';
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
  if (true) return <Bos />;
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
              <a href="#">&leftarrow;</a>
              <span class="text-muted">Back to shop</span>
            </div>
          </div>
          <div class="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div class="row">
              <div class="col" style={{ 'padding-left': 0 }}>
                ITEMS 3
              </div>
              <div class="col text-right">&euro; 132.00</div>
            </div>
            <form>
              <p>SHIPPING</p>{' '}
              <select>
                <option class="text-muted">
                  Standard-Delivery- &euro;5.00
                </option>
              </select>
              <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
            </form>
            <div
              class="row"
              style={{
                'border-top': '1px solid rgba(0,0,0,.1)',
                padding: '2vh 0',
              }}
            >
              <div class="col">TOTAL PRICE</div>
              <div class="col text-right">&euro; 137.00</div>
            </div>{' '}
            <button class="btn-checkout">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sepet;
