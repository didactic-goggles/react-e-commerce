const Urun = (props) => {
    const {product} = props;
    return (
        <div class="row border-top border-bottom">
              <div class="row main align-items-center">
                <div class="col-2">
                  <img
                    class="img-fluid"
                    src="https://i.imgur.com/1GrakTl.jpg"
                  />
                </div>
                <div class="col">
                  <div class="row text-muted">{product.category}</div>
                  <div class="row">{product.name}</div>
                </div>
                <div class="col">
                  <button class="btn">-</button>
                  <a href="#" class="border">
                    1
                  </a>
                  <button class="btn">+</button>
                </div>
                <div class="col">&euro; 44.00</div>
                <div class="col-auto">
                  <span class="close">&#10005;</span>
                </div>
              </div>
            </div>
    )
}

export default Urun
