import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Product from '../../../UI/Product/Product';
import ProductList from '../../../UI/Product/ProductList';

const Sonuc = (props) => {
  console.log('Rendering => Sonuç');

  const { filters, allProducts, mode, showProduct } = props;

  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);
  useEffect(() => {
    console.log(allProducts);
    setFilteredProducts(
      allProducts.filter((product) => showProduct(product))
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
            <h5 className="text-center">
              Aradığınız kriterlere uygun ürün bulunamadı
            </h5>
          </>
        ) : (
          filteredProducts.map((product) => (
            mode === 'grid' ? (
            <div className="col-md-4 mb-2" key={product.id}>
              <Product product={product} />
            </div>) : (<div className="col-12 mb-4" key={product.id}>
              <ProductList product={product} />
            </div>)
          ))
        )}
      </div>
    </>
  );
};

export default Sonuc;
