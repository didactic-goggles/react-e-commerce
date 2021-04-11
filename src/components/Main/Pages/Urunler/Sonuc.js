import React, { useState, useEffect } from 'react';
import {FaSearch} from 'react-icons/fa';
import Product from '../../../UI/Product/Product';

const Sonuc = (props) => {
  console.log('Rendering => Sonuç');

  const { filters, allProducts } = props;

  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);
  useEffect(() => {
    console.log(allProducts);
    setFilteredProducts(
      allProducts.filter((product) => {
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
      })
    );
  }, [allProducts, filters]);
  // useEffect(() => {
  //   console.log('useEffect');

  //   // if (sorting === '') return;
  //   // const mode = sorting.indexOf('desc') !== -1 ? -1 : 1;
  //   let tempProducts = filteredProducts;
  //   console.log(tempProducts);
  //   if (sorting.indexOf('name') !== -1) {
  //     tempProducts = filteredProducts.sort((a, b) =>
  //       a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
  //         ? sorting.indexOf('desc') !== -1 ? 1 : -1
  //         : sorting.indexOf('desc') !== -1 ? -1 : 1
  //     );
  //   }
  //   setSortedProducts(tempProducts);
  //   // console.log(tempProducts);
  // }, [sorting, filteredProducts]);
  return (
    <>
      <div className="row">
        {filteredProducts.length < 1 ? (
          <>
            <FaSearch className="fs-2 my-3" />
            <h5 className="text-center">Aradığınız kriterlere uygun ürün bulunamadı</h5>
          </>
        ) : (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-2" key={product.id}>
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Sonuc;
