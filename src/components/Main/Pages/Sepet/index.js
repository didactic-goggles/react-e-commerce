import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Urun from './Urun';
import Bos from './Bos';
import API from '../../../../api';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
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
  const [formSubmitting, setFormSubmitting] = useState(false);

  const cart = store.cart;

  const handleCreateOrder = async () => {
    try {
      // setFormSubmitting(true);
      // const formData = new FormData();
      // cart.forEach((cartItem, index) => {
      //   console.log(cartItem);
      //   formData.append(`products[${index}][product_id]`, cartItem.product.id);
      //   formData.append(`products[${index}][quantity]`, cartItem.quantity);

      // });
      // formData.append('user_id', 4);
      const body = {
        products: cart.map((p) => ({
          product_id: p.product.id,
          quantity: p.quantity,
        })),
      };
      // const createOrderResponse = await API.post(
      //   'createorder.php',
      //   JSON.stringify(body)
      // );
      // console.log(createOrderResponse);
      setTimeout(() => {
        const response = {
          data: '<script type="text/javascript">if (typeof iyziInit == "undefined") {var iyziInit = {currency:"TRY",token:"ad8ca6e6-3152-469c-98d3-3e56e6db728f",price:120.00,locale:"tr",baseUrl:"https://sandbox-api.iyzipay.com", merchantGatewayBaseUrl:"https://sandbox-merchantgw.iyzipay.com", registerCardEnabled:true,bkmEnabled:true,bankTransferEnabled:false,bankTransferRedirectUrl:"https://comfortmedikal.com/api/result.php",bankTransferCustomUIProps:{},campaignEnabled:false,creditCardEnabled:true,bankTransferAccounts:[],userCards:[],fundEnabled:true,memberCheckoutOtpData:{},force3Ds:false,isSandbox:true,storeNewCardEnabled:true,paymentWithNewCardEnabled:true,enabledApmTypes:["SOFORT","IDEAL","QIWI","GIROPAY"],payWithIyzicoUsed:false,payWithIyzicoEnabled:true,payWithIyzicoCustomUI:{},buyerName:"Dijvar",buyerSurname:"Bozyel",merchantInfo:"",cancelUrl:"",buyerProtectionEnabled:false,hide3DS:false,gsmNumber:"+905514567548",email:"dijwar.bozyel@gmail.com",checkConsumerDetail:{},subscriptionPaymentEnabled:false,ucsEnabled:false,fingerprintEnabled:false,payWithIyzicoFirstTab:false,metadata : {},createTag:function(){var iyziJSTag = document.createElement("script");iyziJSTag.setAttribute("src","https://sandbox-static.iyzipay.com/checkoutform/v2/bundle.js?v=1635529345294");document.head.appendChild(iyziJSTag);}};iyziInit.createTag();}</script>',
        };
        console.log(response.data);
        document.querySelector('#iyzipay-iframe').src =
          'https://sandbox-cpp.iyzipay.com?token=f2661ef1-bb48-49c3-b859-699fadedc4c8&lang=tr&iframe=true';
        // setInnerHTML(document.querySelector('#iyzipay-checkout-form'), response.data);
        // setFormSubmitting(false);
        toggleModal();
      }, 100);
    } catch (error) {
      console.log(error);
    }
    // setFormSubmitting(false);
  };

  const toggleModal = () => {
    const myModalEl = document.querySelector('#exampleModal');
    let modal;
    try {
      modal = new bootstrap.Modal(myModalEl);
    } catch (error) {
      modal = bootstrap.Modal.getInstance(myModalEl);
    }
    modal.toggle();
  };
  if (cart.length < 1) return <Bos />;
  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ödeme Ekranı
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <iframe
                id="iyzipay-iframe"
                className="w-100"
                style={{
                  height: '600px',
                }}
                title="iyzipay-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div id="cart" className="container my-5">
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
                    (sum, p) =>
                      Number(p.productDetails.price) * p.quantity + sum,
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
                <div className="col text-right">
                  &#8378;
                  {cart.reduce(
                    (sum, p) =>
                      Number(p.productDetails.price) * p.quantity + sum,
                    0
                  )}
                </div>
              </div>{' '}
              <button
                className="btn-checkout"
                onClick={handleCreateOrder}
                disabled={formSubmitting}
              >
                Siparişi Tamamla
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sepet;
