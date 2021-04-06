import React from 'react'
import Product from '../../../UI/Product/Product';

const Sonuc = (props) => {
    console.log('Rendering => Sonuç');
    
    const {filters, allProducts} = props;
    console.log(filters);
    const tempProducts = allProducts.filter(product => {
      try {
        console.log(product.categoryId);
        if(filters.categories.length > 0 && !filters.categories.includes(Number(product.categoryId)))
          return false;
        if(filters.subCategories.length > 0 && !filters.subCategories.includes(Number(product.subCategoryId)))
          return false;
        if(filters.childCategories.length > 0 && !filters.childCategories.includes(Number(product.childCategoryId)))
          return false;
        if(filters.brands.length > 0 && !filters.brands.includes(Number(product.brandId)))
          return false;
        if(filters.ratings.length > 0 && !filters.ratings.includes(Math.round(Number(product.rating))))
          return false;
      } catch ( error ) {}
      return true;
    });

    // setFilteredProducts(tempProducts);
    return (
        <div className="row">
            {tempProducts.map(product => (
                <div className="col-md-3" key={product.id}>
                    <Product product={product} />
                </div>
            ))}
        </div>
    )
}

export default Sonuc
