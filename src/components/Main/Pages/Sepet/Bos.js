import { Link } from 'react-router-dom';
import { BsCartX } from 'react-icons/bs';

const Bos = () => {
  return (
    <div className="container">
      <div className="text-center py-4">
        <BsCartX className="mb-3" style={{fontSize: '70px'}}/>
        <h4>Sepetiniz şu an boş.</h4>
        <h5>Ürünlerimizi inceleyip sepetinize ekleyebilirsiniz</h5>
        <Link className="btn btn-primary" to="/urunler">
          Ürünleri İncele
        </Link>
      </div>
    </div>
  );
};

export default Bos;
