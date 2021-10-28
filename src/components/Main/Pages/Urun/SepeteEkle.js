import { useState } from 'react';
import {
  useAuthDispatch,
  useAuthState,
  addProduct,
  removeProduct,
} from '../../../../context';
import './sepet.scss';

const SepeteEkle = (props) => {
  const dispatch = useAuthDispatch();
  const store = useAuthState();
  const { product, userDetails } = props;
  const [quantity, setQuantity] = useState(store.cart.find((p) => p.id === product.id)?.quantity || 0);
  const [inCart, setInCart] = useState(
    !!store.cart.find((p) => p.id === product.id)
  );
  //   console.log(product, userDetails);

  const handleQuantityChange = (newValue) => {
    let targetValue = newValue;
    if (newValue < 0) {
      targetValue = 0;
    }
    setQuantity(targetValue);
    if (inCart) {
      addProduct(dispatch, {
        ...product,
        quantity: targetValue,
      });
    }
  };

  const handleProductCartStateChange = () => {
    if (inCart) {
      removeProduct(dispatch, product.id);
      setInCart(false);
    } else {
      addProduct(dispatch, {
        ...product,
        quantity,
      });
      setInCart(true);
    }
  };
  // useEffect(() => {
  //   console.log(quantity);
  // }, [quantity]);

  if (!userDetails) return <div></div>;

  return (
    <>
      <div className="d-flex">
        <fieldset data-quantity="" className="ms-auto me-3">
          <button
            type="button"
            title="Down"
            className="sub"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            Down
          </button>
          <input
            type="number"
            name="quantity"
            pattern="[0-9]+"
            value={quantity}
            onInput={(e) => handleQuantityChange(Number(e.target.value))}
          />
          <button
            type="button"
            title="Up"
            className="add"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            Up
          </button>
        </fieldset>
        <button
          className="btn btn-primary"
          onClick={handleProductCartStateChange}
        >
          {inCart ? 'Sepetten Çıkar' : 'Sepete Ekle'}
        </button>
      </div>
    </>
  );
};

export default SepeteEkle;
