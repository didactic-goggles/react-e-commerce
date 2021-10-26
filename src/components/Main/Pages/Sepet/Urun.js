import { useState } from 'react';

const Urun = (props) => {
  const baseURL = 'https://comfortmedikal.com/';

  const { product, dispatch, removeProduct, addProduct } = props;
  const [quantity, setQuantity] = useState(product.quantity || 0);

  console.log(product);
  const handleQuantityChange = (newValue) => {
    let targetValue = newValue;
    if (newValue < 1) {
      targetValue = 1;
    }
    setQuantity(targetValue);
    addProduct(dispatch, {
      ...product,
      quantity: targetValue,
    });
  };
  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2">
          <img
            className="card-img-top"
            style={{ borderRadius: '1rem' }}
            src={`${baseURL}${product.productImages.find(
                    (productImage) =>
                      productImage.id ===
                      product.productDetails.product_base_image_id
                  ).image_path}`
                || 'https://via.placeholder.com/150'
            }
            alt={product.product.name}
            onError={(event) =>
              (event.target.src = 'https://via.placeholder.com/150')
            }
          />
        </div>
        <div className="col">
          <div className="row text-muted">{product.categories.category}</div>
          <div className="row">{product.product.name}</div>
        </div>
        <div className="col d-flex align-items-center">
          <button
            className="btn"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </button>
          <span className="border px-3">{quantity}</span>
          <button
            className="btn"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="col">&#8378; {Number(product.productDetails.price) * quantity}</div>
        <div className="col-auto">
          <button
            className="btn btn-close btn-sm"
            onClick={() => {
              removeProduct(dispatch, product.id);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Urun;
