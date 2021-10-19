const Urun = (props) => {
  const { product } = props;
  return (
    <div class="row border-top border-bottom">
      <div class="row main align-items-center">
        <div class="col-2">
          <img
            class="img-fluid"
            src="https://i.imgur.com/1GrakTl.jpg"
            alt={product.name}
          />
        </div>
        <div class="col">
          <div class="row text-muted">{product.category}</div>
          <div class="row">{product.name}</div>
        </div>
        <div class="col d-flex align-items-center">
          <button class="btn">-</button>
          <span class="border px-3">1</span>
          <button class="btn">+</button>
        </div>
        <div class="col">&#8378; 44.00</div>
        <div class="col-auto">
          <button class="btn btn-close btn-sm"></button>
        </div>
      </div>
    </div>
  );
};

export default Urun;
