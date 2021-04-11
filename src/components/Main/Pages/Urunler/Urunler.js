import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import ReactStars from 'react-rating-stars-component';
import {
  FaRegStar,
  FaStarHalfAlt,
  FaStar,
  // FaSortAlphaDownAlt,
  FaSortAlphaDown,
} from 'react-icons/fa';

import { useAuthState } from '../../../../context';
import Sonuc from './Sonuc';
import LoadingIndicator from '../../../UI/LoadingIndicator';
const Urunler = () => {
  console.log('Rendering => Ürünler');
  const history = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const userDetails = useAuthState();
  const [filters, setFilters] = useState({
    categories: [
      ...(query.get('categories')
        ? query
            .get('categories')
            .split(',')
            .map((item) => Number(item))
        : []),
    ],
    subCategories: [
      ...(query.get('subCategories')
        ? query
            .get('subCategories')
            .split(',')
            .map((item) => Number(item))
        : []),
    ],
    childCategories: [
      ...(query.get('childCategories')
        ? query
            .get('childCategories')
            .split(',')
            .map((item) => Number(item))
        : []),
    ],
    brands: [
      ...(query.get('brands')
        ? query
            .get('brands')
            .split(',')
            .map((item) => Number(item))
        : []),
    ],
    ratings: [
      ...(query.get('ratings')
        ? query
            .get('ratings')
            .split(',')
            .map((item) => Number(item))
        : []),
    ],
  });
  const [sorting, setSorting] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  // const filters = {
  //     categories: [],
  //     subCategories: [],
  //     childCategories: [],
  //     ratings: [],
  //   };
  // const [loading, setLoading] = useState(false)
  //   const [filteredProducts, setFilteredProducts] = useState(
  //     userDetails.products
  //   );
  const starsSettings = {
    isHalf: true,
    size: 16,
    edit: false,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
  };

  const CategoriesFilter = () => {
    if (!userDetails.categories || userDetails.categories.length === 0) {
      return null;
    }
    const Categories = () =>
      userDetails.categories.map((category) => (
        <div className="form-check" key={category.id}>
          <input
            className="form-check-input"
            type="checkbox"
            value={category.id}
            name="categoryId"
            id={`category-checkbox-${category.id}`}
            onChange={(event) => {
              const categoryElement = document.getElementById(
                `category-checkbox-collapse-${category.id}`
              );
              const categoryCollapse = new bootstrap.Collapse(categoryElement);
              const tempFilters = { ...filters };
              if (event.target.checked) {
                tempFilters.categories.push(Number(category.id));
                categoryCollapse.show();
              } else {
                tempFilters.categories = tempFilters.categories.filter(
                  (categoryId) => Number(category.id) !== categoryId
                );
                categoryCollapse.hide();
              }
              setFilters(tempFilters);
            }}
            checked={filters.categories.includes(Number(category.id))}
          />
          <label
            className="form-check-label"
            htmlFor={`category-checkbox-${category.id}`}
          >
            {category.name}
          </label>
          <div
            className={`collapse ps-2 ${
              filters.categories.includes(Number(category.id)) && 'show'
            }`}
            id={`category-checkbox-collapse-${category.id}`}
          >
            {category.subCategories.map((subCategory) => (
              <div key={subCategory.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`sub-category-checkbox-${subCategory.id}`}
                  onChange={(event) => {
                    const subCategoryElement = document.getElementById(
                      `sub-category-checkbox-collapse-${subCategory.id}`
                    );
                    const subCategoryCollapse = new bootstrap.Collapse(
                      subCategoryElement
                    );
                    const tempFilters = { ...filters };
                    if (event.target.checked) {
                      tempFilters.subCategories.push(Number(subCategory.id));
                      subCategoryCollapse.show();
                    } else {
                      tempFilters.subCategories = tempFilters.subCategories.filter(
                        (subCategoryId) =>
                          Number(subCategory.id) !== subCategoryId
                      );
                      subCategoryCollapse.hide();
                    }
                    setFilters(tempFilters);
                  }}
                  checked={filters.subCategories.includes(
                    Number(subCategory.id)
                  )}
                />
                <label
                  className="form-check-label"
                  htmlFor={`sub-category-checkbox-${subCategory.id}`}
                >
                  {subCategory.sub_category_name}
                </label>
                <div
                  className={`collapse ps-2 ${
                    filters.subCategories.includes(Number(subCategory.id)) &&
                    'show'
                  }`}
                  id={`sub-category-checkbox-collapse-${subCategory.id}`}
                >
                  {subCategory.childCategories.map((childCategory) => (
                    <div key={childCategory.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`child-category-checkbox-${childCategory.id}`}
                        onChange={(event) => {
                          const tempFilters = { ...filters };
                          if (event.target.checked) {
                            tempFilters.childCategories.push(
                              Number(childCategory.id)
                            );
                          } else {
                            tempFilters.childCategories = tempFilters.childCategories.filter(
                              (childCategoryId) =>
                                Number(childCategory.id) !== childCategoryId
                            );
                          }
                          setFilters(tempFilters);
                        }}
                        checked={filters.childCategories.includes(
                          Number(childCategory.id)
                        )}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`child-category-checkbox-${childCategory.id}`}
                      >
                        {childCategory.child_category_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ));
    return (
      <div className="form-group mb-3">
        <h6 className="fw-bolder">Kategori</h6>
        <Categories />
      </div>
    );
  };

  const BrandsFilter = () => {
    if (!userDetails.brands || userDetails.brands.length === 0) return null;

    const brandElements = [];
    userDetails.brands.forEach((brand) => {
      brandElements.push(
        <div className="form-check" key={brand.id}>
          <input
            className="form-check-input"
            type="checkbox"
            value={brand.id}
            id={`brand-checkbox-${brand.id}`}
            onChange={(event) => {
              const tempFilters = { ...filters };
              if (event.target.checked) {
                tempFilters.brands.push(Number(brand.id));
              } else {
                tempFilters.brands = tempFilters.brands.filter(
                  (brandId) => Number(brand.id) !== brandId
                );
              }
              setFilters(tempFilters);
            }}
            checked={filters.brands.includes(Number(brand.id))}
          />
          <label
            className="form-check-label d-flex align-items-center"
            htmlFor={`brand-checkbox-${brand.id}`}
          >
            {brand.name}
          </label>
        </div>
      );
    });
    return (
      <div className="form-group mb-3">
        <h6 className="fw-bolder">Markalar</h6>
        {brandElements}
      </div>
    );
  };
  const RatingsFilter = () => {
    const Ratings = () => {
      const ratingElements = [];
      for (let i = 4; i > 0; i--) {
        ratingElements.push(
          <div className="form-check" key={i}>
            <input
              className="form-check-input"
              type="checkbox"
              value={i}
              id={`rating-checkbox-${i}`}
              onChange={(event) => {
                const ratingValue = Number(event.target.value);
                //   if(event.target.checked) {
                //     filters.ratings.push(ratingValue);
                //   } else {
                //     filters.ratings = filters.ratings.filter(rating => rating !== ratingValue)
                //   }
                const tempFilters = { ...filters };
                if (event.target.checked) {
                  tempFilters.ratings.push(ratingValue);
                } else {
                  tempFilters.ratings = tempFilters.ratings.filter(
                    (rating) => rating !== ratingValue
                  );
                }
                setFilters(tempFilters);
              }}
              checked={filters.ratings.includes(Number(i))}
            />
            <label
              className="form-check-label d-flex align-items-center"
              htmlFor={`rating-checkbox-${i}`}
            >
              <ReactStars
                {...starsSettings}
                className="text-center"
                value={i}
              />
              <small className="ms-1">ve üzeri</small>
            </label>
          </div>
        );
      }
      return ratingElements;
    };
    return (
      <div className="form-group">
        <h6 className="fw-bolder">Derecelendirme</h6>
        <Ratings />
      </div>
    );
  };

  useEffect(() => {
    console.log('useEffect');
    setLoading(true);
    let tempProducts = userDetails.products.filter((product) => {
      try {
        if (
          filters.categories.length > 0 &&
          !filters.categories.includes(Number(product.categoryId))
        )
          return false;
        if (
          filters.subCategories.length > 0 &&
          !filters.subCategories.includes(Number(product.subCategoryId))
        )
          return false;
        if (
          filters.childCategories.length > 0 &&
          !filters.childCategories.includes(Number(product.childCategoryId))
        )
          return false;
        if (
          filters.brands.length > 0 &&
          !filters.brands.includes(Number(product.brandId))
        )
          return false;
        if (
          filters.ratings.length > 0 &&
          !filters.ratings.includes(Math.round(Number(product.rating)))
        )
          return false;
      } catch (error) {}
      return true;
    });
    if (sorting !== '') {
      if (sorting.indexOf('name') !== -1) {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
            ? sorting.indexOf('desc') !== -1
              ? 1
              : -1
            : sorting.indexOf('desc') !== -1
            ? -1
            : 1
        );
      } else if (sorting.indexOf('rating') !== -1) {
        tempProducts = tempProducts.sort((a, b) =>
          a.rating < b.rating
            ? sorting.indexOf('desc') !== -1
              ? 1
              : -1
            : sorting.indexOf('desc') !== -1
            ? -1
            : 1
        );
      }
    }
    setProducts(tempProducts);
    setLoading(false);
    console.log(loading);
    let filtersString = '';

    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        filtersString += `${key}=${filters[key].toString()}&`;
      }
    });
    if(filtersString !== '' && filtersString !== window.location.search) {
      console.log(filters);
      console.log(window.location.search);
      history.push({
        search: `?${filtersString}`,
      });
    }
  }, [filters, history, loading, sorting, userDetails]);

  return (
    <section className="container py-3">
      <div className="row">
        <div className="col-md-3 mb-2">
          <div className="card rounded-0">
            <div className="card-body">
              <form>
                <CategoriesFilter />
                <BrandsFilter />
                <RatingsFilter />
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="border-bottom mb-3">
            <div className="row form-group justify-content-end mb-0">
              {/* <div className="col-auto">
                <button className="btn btn-light">

                </button>
              </div> */}
              <div className="col-auto d-flex align-items-center mb-3">
                <span className="me-2 text-muted">
                  <FaSortAlphaDown style={{ fontSize: '20px' }} />
                  {/* {sorting === 'name:desc' ? (
                    
                  ) : sorting === 'name:desc' ? (
                    <FaSortAlphaDown />
                  ) : (
                    sorting === 'rating:desc'
                  )} */}
                </span>
                <select
                  className="form-control rounded-0"
                  value={sorting}
                  onChange={(event) => setSorting(event.target.value)}
                >
                  <option>Sıralama Seçin</option>
                  <option value="name:asc">İsme göre: A'dan Z'ye</option>
                  <option value="name:desc">İsme göre: Z'den A'ya</option>
                  <option value="rating:asc">
                    Puana göre: Küçükten Büyüğe
                  </option>
                  <option value="rating:desc">
                    Puana göre: Büyükten Küçüğe
                  </option>
                </select>
              </div>
            </div>
          </div>
          {loading ? (
            <LoadingIndicator text="Ürünler Yükleniyor..." />
          ) : (
            <Sonuc filters={filters} allProducts={products} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Urunler;
