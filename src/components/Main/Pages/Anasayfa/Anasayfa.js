import { FaRegClock } from 'react-icons/fa';
import CategoriesVerticalNav from './CategoriesVerticalNav';
import ProductsSlider from './ProductsSlider';

const Anasayfa = () => {
  console.log('Rendering => Anasayfa');
  return (
    <>
      {/* // begin:: Slider */}
      <section className="mb-3">
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="600"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Ürün Foto</title>
                <rect width="100%" height="100%" fill="#777" />
                <text x="50%" y="50%" fill="#555" dy=".3em">
                  Ürün 1
                </text>
              </svg>

              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>Ürün Başlığı</h1>
                  <p>Ürün Açıklaması</p>
                  <p>
                    <button className="btn btn-lg btn-primary">
                      Ürün Detayına Git
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="600"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#777" />
                <text x="50%" y="50%" fill="#555" dy=".3em">
                  Ürün 2
                </text>
              </svg>

              <div className="container">
                <div className="carousel-caption">
                  <h1>Ürün Başlığı</h1>
                  <p>Ürün Açıklaması</p>
                  <p>
                    <button className="btn btn-lg btn-primary">
                      Ürün Detayına Git
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="600"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#777" />
                <text x="50%" y="50%" fill="#555" dy=".3em">
                  Ürün 3
                </text>
              </svg>

              <div className="container">
                <div className="carousel-caption text-end">
                  <h1>Ürün Başlığı</h1>
                  <p>Ürün Açıklaması</p>
                  <p>
                    <button className="btn btn-lg btn-primary">
                      Ürün Detayına Git
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      {/* end:: Slider */}
      {/* begin:: Section: Info */}
      <section className="bg-light bg-gradient p-5 my-5 shadow">
        <div className="container">
          <div className="d-flex justify-content-center">
            <span className="px-2 px-sm-5 d-flex justify-content-center flex-column border-end">
              <span className="text-center fs-1">
                <FaRegClock />
              </span>
              <span className="text-center">
                <h4>Çalışma Saatlerimiz</h4>
                <span className="me-2">Pazartesi - Cumartesi</span>
                <span className="fw-bold">08:00 - 18:00</span>
              </span>
            </span>
            <span className="px-2 px-sm-5 d-flex justify-content-center flex-column border-end">
              <span className="text-center fs-1">
                <FaRegClock />
              </span>
              <span className="text-center">
                <h4>Çalışma Saatlerimiz</h4>
                <span className="me-2">Pazartesi - Cumartesi</span>
                <span className="fw-bold">08:00 - 18:00</span>
              </span>
            </span>
            <span className="px-2 px-sm-5 d-flex justify-content-center flex-column">
              <span className="text-center fs-1">
                <FaRegClock />
              </span>
              <span className="text-center">
                <h4>Çalışma Saatlerimiz</h4>
                <span className="me-2">Pazartesi - Cumartesi</span>
                <span className="fw-bold">08:00 - 18:00</span>
              </span>
            </span>
          </div>
        </div>
      </section>
      {/* end:: Section: Info */}
      {/* begin:: Cards: Product */}
      <section className="container mb-3">
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-light border-0 rounded-3 shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 d-flex justify-content-center flex-column">
                    <h4>AAA Serisi Ürünler</h4>
                    <button href="#" className="btn btn-link text-start px-0">İnceleyin</button>
                  </div>
                  <div className="col-6">
                    <img className="w-100" src="https://comfortmedikal.com/img/resim_orjinal/test-transparent1.png" alt="test"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light border-0 rounded-3 shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 d-flex justify-content-center flex-column">
                    <h4>AAA Serisi Ürünler</h4>
                    <button className="btn btn-link text-start px-0">İnceleyin</button>
                  </div>
                  <div className="col-6">
                    <img className="w-100" src="https://comfortmedikal.com/img/resim_orjinal/test-transparent1.png" alt="test"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light border-0 rounded-3 shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 d-flex justify-content-center flex-column">
                    <h4>AAA Serisi Ürünler</h4>
                    <button className="btn btn-link text-start px-0">İnceleyin</button>
                  </div>
                  <div className="col-6">
                    <img className="w-100" src="https://comfortmedikal.com/img/resim_orjinal/test-transparent1.png" alt="test"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end:: Cards: Product */}
      {/* begin:: Collapse: Categories */}
      <section className="container mb-3">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <CategoriesVerticalNav />
          </div>
          <div className="col-md-8 col-lg-9">
            <ProductsSlider />
          </div>
        </div>
      </section>
      {/* end:: Collapse: Categories */}
    </>
  );
};

export default Anasayfa;
