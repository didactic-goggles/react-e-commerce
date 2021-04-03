import React, { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import ReactStars from 'react-rating-stars-component';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';

import { useAuthState } from '../../../../context';
import Sonuc from './Sonuc';
const Urunler = () => {
  console.log('Rendering => Ürünler');
  const userDetails = useAuthState();
  const [filters, setFilters] = useState({
    categories: [],
    subCategories: [],
    childCategories: [],
    ratings: [],
  });
// const filters = {
//     categories: [],
//     subCategories: [],
//     childCategories: [],
//     ratings: [],
//   };
  const [filteredProducts, setFilteredProducts] = useState(
    userDetails.products
  );
  console.log(userDetails);
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
              const tempFilters = {...filters};
              if(event.target.checked) {
                tempFilters.categories.push(Number(category.id));
                categoryCollapse.show();
              } else {
                  tempFilters.categories = tempFilters.categories.filter(categoryId => Number(category.id) !== categoryId);
                  categoryCollapse.hide();
              }
              setFilters(tempFilters);
              console.log(filters);
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
            className="collapse ps-2"
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
                    subCategoryCollapse.toggle();
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`sub-category-checkbox-${subCategory.id}`}
                >
                  {subCategory.sub_category_name}
                </label>
                <div
                  className="collapse ps-2"
                  id={`sub-category-checkbox-collapse-${subCategory.id}`}
                >
                  {subCategory.childCategories.map((childCategory) => (
                    <div key={childCategory.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={`child-category-checkbox-${childCategory.id}`}
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
        <h6 className="font-weight-bolder">Kategori</h6>
        <Categories />
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
                  const tempFilters = {...filters};
                  if(event.target.checked) {
                    tempFilters.ratings.push(ratingValue);
                  } else {
                    tempFilters.ratings = tempFilters.ratings.filter(rating => rating !== ratingValue)
                  }
                  setFilters(tempFilters);
                console.log(tempFilters);
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
        <h6 className="font-weight-bolder">Derecelendirme</h6>
        <Ratings />
      </div>
    );
  };

  useEffect(() => {
    setFilteredProducts(2);
  }, [filters]);
  return (
    <section className="container py-3">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <form>
                <CategoriesFilter />
                <RatingsFilter />
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <Sonuc filters={filters} />
        </div>
      </div>
    </section>
  );
};

export default Urunler;
