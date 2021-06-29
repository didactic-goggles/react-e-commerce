// import { FaRegClock, FaHeadset, FaTruck } from 'react-icons/fa';
// import CategoriesVerticalNav from './CategoriesVerticalNav';
import ProductsSlider from './ProductsSlider';

const Anasayfa = () => {
  console.log('Rendering => Anasayfa');
  return (
    <>
      {/* // begin:: Slider */}
      <section className="mb-3">
        <div id="myCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel" data-interval="false">
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
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            {/* <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="5"
              aria-label="Slide 6"
            ></button> */}
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active lg-1">
              <img
                src="https://comfortmedikal.com/img/anasayfa/1.png"
                // className="w-100"
                alt="Tena"
              />

              <div className="container d-none">
                <div className="carousel-caption">
                  <h1>TENA</h1>
                  <p>Ürün Açıklaması</p>
                  <p>
                    <button className="btn btn-lg btn-primary">
                      İnceleyin
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item lg-2">
              <img
                src="https://comfortmedikal.com/img/anasayfa/2.png"
                className=""
                alt="Evony"
              />
              <div className="container d-none">
                <div className="carousel-caption text-center text-dark">
                  <h1>EVONY</h1>
                  {/* <p>DAYANIKLI HASTA BEZLERİ</p>
                  <p>
                    <button className="btn btn-lg btn-primary">
                      İnceleyin
                    </button>
                  </p> */}
                </div>
              </div>
            </div>
            <div className="carousel-item lg-3">
              <img
                src="https://comfortmedikal.com/img/anasayfa/3.png"
                // className="m-357"
                alt="Joly"
              />

              <div className="container d-none">
                <div className="carousel-caption text-end text-primary">
                  <h1>JOLY</h1>
                  {/* <p>Ürün Açıklaması</p>
                  <p>
                    <button className="btn btn-lg btn-primary">
                      Ürün Detayına Git
                    </button>
                  </p> */}
                </div>
              </div>
            </div>
          <div className="carousel-item lg-3">
              <img
                src="https://comfortmedikal.com/img/anasayfa/4.png"
                // className="m-369"
                alt="Hi-slip"
              />

              <div className="container d-none">
                <div className="carousel-caption text-end text-primary">
                  <h1>Hİ-SLİP</h1>
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
      {/* <section className="bg-light bg-gradient px-5 py-4 my-5 shadow">
        <div className="container">
          <div className="row justify-content-center align-items-stretch">
            <div className="col-md-4 col-12 mb-3">
              <span className="px-2 px-sm-5 d-flex justify-content-center flex-column border-right-md border-sm-0 h-100">
                <span className="text-center fs-1 mb-auto">
                  <FaRegClock />
                </span>
                <span className="text-center mb-auto">
                  <h4>Çalışma Saatlerimiz</h4>
                  <span className="me-2">Pazartesi - Cumartesi</span>
                  <span className="fw-bold">08:00 - 18:00</span>
                </span>
              </span>
            </div>
            <div className="col-md-4 col-12 mb-3">
              <span className="px-2 px-sm-5 d-flex justify-content-center flex-column border-right-md border-sm-0 h-100">
                <span className="text-center fs-1 mb-auto">
                  <FaHeadset />
                </span>
                <span className="text-center mb-auto">
                  <h4>Sipariş Desteği</h4>
                  <span className="me-2">7/24 Destek Hattı</span>
                  <span className="fw-bold">222 222 22 22</span>
                </span>
              </span>
            </div>
            <div className="col-md-4 col-12">
              <span className="px-2 px-sm-5 d-flex justify-content-center flex-column h-100">
                <span className="text-center fs-1 mb-auto">
                  <FaTruck />
                </span>
                <span className="text-center mb-auto">
                  <h4>Hızlı Kargo</h4>
                  <span className="me-2">Pazartesi - Cumartesi</span>
                  <span className="fw-bold">08:00 - 18:00</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section> */}
      {/* end:: Section: Info */}
      {/* begin:: Cards: Product */}
      <section className="container mb-3">
        <div className="row">
          <div className="col-md-4 mb-2">
            <div className="card bg-light border-0 rounded-3 shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-6 d-flex justify-content-center flex-column">
                    <h4>AAA Serisi Ürünler</h4>
                    <button href="#" className="btn btn-link text-start px-0">
                      İnceleyin
                    </button>
                  </div>
                  <div className="col-6">
                    <img
                      className="w-100"
                      src="https://comfortmedikal.com/img/resim_orjinal/test-transparent2.png"
                      alt="test"
                      style={{ maxWidth: '200px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div className="card bg-light border-0 rounded-3 shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-6 d-flex justify-content-center flex-column">
                    <h4>AAA Serisi Ürünler</h4>
                    <button href="#" className="btn btn-link text-start px-0">
                      İnceleyin
                    </button>
                  </div>
                  <div className="col-6">
                    <img
                      className="w-100"
                      src="https://comfortmedikal.com/img/resim_orjinal/test-transparent2.png"
                      alt="test"
                      style={{ maxWidth: '200px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div className="card bg-light border-0 rounded-3 shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-6 d-flex justify-content-center flex-column">
                    <h4>AAA Serisi Ürünler</h4>
                    <button href="#" className="btn btn-link text-start px-0">
                      İnceleyin
                    </button>
                  </div>
                  <div className="col-6">
                    <img
                      className="w-100"
                      src="https://comfortmedikal.com/img/resim_orjinal/test-transparent2.png"
                      alt="test"
                      style={{ maxWidth: '200px' }}
                    />
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
          {/* <div className="col-md-4 col-lg-3 mb-3">
            <CategoriesVerticalNav />
          </div>
          <div className="col-md-8 col-lg-9">
            <ProductsSlider />
          </div> */}
          <div className="col-12 border-bottom mb-3">
            <ProductsSlider category='HASTA BEZLERİ' subCategory='YETİŞKİN BEZLERİ' childCategory='EMİCİ KÜLOTLU BEZLER' special={true}/>
          </div>
          <div className="col-12 border-bottom mb-3">
            <ProductsSlider category='HASTA BEZLERİ' subCategory='YETİŞKİN BEZLERİ' childCategory='BELBANTLI BEZLER' special={true}/>
          </div>
          <div className="col-12 border-bottom mb-3">
            <ProductsSlider category='HASTA BEZLERİ' subCategory='ÇOCUK BEZLERİ' special={true}/>
          </div>
          <div className="col-12 border-bottom mb-3">
            <ProductsSlider category='YATAK KORUYUCULARI'/>
          </div>
          <div className="col-12">
            <ProductsSlider category='MESANE PEDLERİ' special={true} />
          </div>
        </div>
      </section>
      {/* end:: Collapse: Categories */}
    </>
  );
};

export default Anasayfa;
