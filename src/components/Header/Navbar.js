/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaSearch,
  FaTimes,
  // FaHome,
  FaUsers,
  FaTags,
  FaBoxOpen,
  FaLocationArrow,
  FaMapMarkedAlt,
} from 'react-icons/fa';

// import API from '../../api';
import {
  useAuthDispatch,
  getAllCategories,
  getAllBrands,
  getAllProducts,
  useAuthState,
} from '../../context';

const Navbar = () => {
  console.log('Rendering => Navbar');
  const baseURL = 'https://comfortmedikal.com/';
  const searchDropdown = useRef();
  const searchInput = useRef();
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const [allMenuTypes, setAllMenuTypes] = useState({});
  const [searchResults, setSearchResults] = useState({
    categories: [],
    subCategories: [],
    childCategories: [],
    brands: [],
    subBrands: [],
    products: [],
  });
  // const getAllBrandsAndCategories = async () => {
  //   // getAllCategories(dispatch);
  //   // console.log(asd);
  //   // const getAllBrandsResponse = API.get('/brands.php');
  //   // const getAllCategoriesResponse = API.get('/categories.php');
  //   const allResponses = await Promise.all([
  //     getAllCategories(dispatch),
  //     getAllBrands(dispatch),
  //     getAllProducts(dispatch),
  //   ]);
  //   setAllMenuTypes({
  //     categories: allResponses[0].categories,
  //     brands: allResponses[1].brands,
  //     products: allResponses[2].products,
  //   });
  // };

  useEffect(() => {
    const getAllBrandsAndCategories = async () => {
      // getAllCategories(dispatch);
      // console.log(asd);
      // const getAllBrandsResponse = API.get('/brands.php');
      // const getAllCategoriesResponse = API.get('/categories.php');
      const allResponses = await Promise.all([
        getAllCategories(dispatch),
        getAllBrands(dispatch),
        getAllProducts(dispatch),
      ]);
      setAllMenuTypes({
        categories: allResponses[0].categories,
        brands: allResponses[1].brands,
        products: allResponses[2].products,
      });
    };
    getAllBrandsAndCategories();
  }, [dispatch]);

  const handleSearch = () => {
    const searchValue = searchInput.current.value;
    if (searchValue.trim().length < 3) {
      setSearchResults(null);
      searchDropdown.current.classList.remove('show');
      return;
    }
    const tempSearchResults = {
      categories: [],
      subCategories: [],
      childCategories: [],
      brands: [],
      products: [],
    };
    userDetails.categories.forEach((category) => {
      if (category.name.toLocaleLowerCase().indexOf(searchValue) !== -1) {
        tempSearchResults.categories.push(category);
      }
      category.subCategories.forEach((subCategory) => {
        if (
          subCategory.sub_category_name
            .toLocaleLowerCase()
            .indexOf(searchValue) !== -1
        ) {
          tempSearchResults.subCategories.push({
            ...subCategory,
            category_id: category.id,
            category_name: category.name,
          });
        }
        subCategory.childCategories.forEach((childCategory) => {
          if (
            childCategory.child_category_name
              .toLocaleLowerCase()
              .indexOf(searchValue) !== -1
          ) {
            tempSearchResults.childCategories.push({
              ...childCategory,
              category_id: category.id,
              category_name: category.name,
              sub_category_id: subCategory.id,
              sub_category_name: subCategory.sub_category_name,
            });
          }
        });
      });
    });
    userDetails.brands.forEach(
      (brand) =>
        brand.name.toLocaleLowerCase().indexOf(searchValue) !== -1 &&
        tempSearchResults.brands.push(brand)
    );
    userDetails.products.forEach(
      (product) =>
        product.name.toLocaleLowerCase().indexOf(searchValue) !== -1 &&
        tempSearchResults.products.push(product)
    );
    if (
      tempSearchResults.categories.length === 0 &&
      tempSearchResults.subCategories.length === 0 &&
      tempSearchResults.childCategories.length === 0 &&
      tempSearchResults.brands.length === 0 &&
      tempSearchResults.products.length === 0
    ) {
      setSearchResults(null);
      searchDropdown.current.classList.add('show');
      return;
    }
    setSearchResults(tempSearchResults);
    searchDropdown.current.classList.add('show');
  };

  const handleSearchBlur = (event) => {
    setTimeout(() => {
      searchDropdown.current.classList.remove('show');
      setSearchResults(null);
    }, 100);
  };

  const handleSearchCancel = (event) => {
    setSearchResults(null);
    searchDropdown.current.classList.remove('show');
    searchInput.current.value = '';
  };

  const SearchResults = () => {
    if (searchResults == null)
      return <h5 className="px-3 py-2">Sonuç bulunamadı...</h5>;
    // else if(searchResults === 'empty') return <h5>Yazmaya devam edin...</h5>;
    return (
      <>
        {searchResults.categories.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Kategoriler</h6>
            {searchResults.categories.map((category, index) => (
              <Link
                key={index}
                to={`/urunler?categories=${category.id}`}
                className="list-group-item list-group-item-action"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        {searchResults.subCategories.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Alt Kategoriler</h6>
            {searchResults.subCategories.map((subCategory, index) => (
              <Link
                key={index}
                to={`/urunler?categories=${subCategory.category_id}&subCategories=${subCategory.id}`}
                className="list-group-item list-group-item-action"
              >
                <span className="d-block">{subCategory.sub_category_name}</span>
                <small className="text-muted">
                  {subCategory.category_name}
                </small>
                <span> &gt; </span>
                {}
              </Link>
            ))}
          </div>
        )}
        {searchResults.childCategories.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Ürün Tipi</h6>
            {searchResults.childCategories.map((childCategory, index) => (
              <Link
                key={index}
                to={`/urunler?categories=${childCategory.category_id}&subCategories=${childCategory.sub_category_id}&childCategories=${childCategory.id}`}
                className="list-group-item list-group-item-action"
              >
                <span className="d-block">
                  {childCategory.child_category_name}
                </span>
                <small className="text-muted">
                  {childCategory.category_name}
                </small>
                <span> &gt; </span>
                <small className="text-muted">
                  {childCategory.sub_category_name}
                </small>
                <span> &gt; </span>
              </Link>
            ))}
          </div>
        )}
        {searchResults.brands.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Markalar</h6>
            {searchResults.brands.map((brand, index) => (
              <Link
                key={index}
                to={`/urunler?brands=${brand.id}`}
                className="list-group-item list-group-item-action"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        )}
        {searchResults.products.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Ürünler</h6>
            {searchResults.products.map((product, index) => (
              <Link
                key={index}
                to={`/urun/${product.id}`}
                className="list-group-item list-group-item-action"
              >
                <div>
                  <img
                    className="me-2"
                    style={{
                      width: '50px',
                    }}
                    src={
                      product.productPrimaryImage
                        ? `${baseURL}${product.productPrimaryImage}`
                        : 'https://via.placeholder.com/150'
                    }
                    alt={product.name}
                    onError={(event) =>
                      event.target.src !== 'https://via.placeholder.com/150'
                        ? (event.target.src = 'https://via.placeholder.com/150')
                        : ''
                    }
                  />
                  <span>{product.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </>
    );
  };
  return (
    <>
      {/* begin:: Main Nav */}
      <section className="pt-3">
        <div className="container d-flex align-items-center flex-column flex-md-row mb-2">
          <NavLink to="/" exact className="text-decoration-none logo">
            <img src='https://comfortmedikal.com/img/logo/comfort-logo-transparent.png' alt='Comfort Medikal İstanbul' className='header-logo'/>
          </NavLink>
          <div className="dropdown w-100 searchbox-container">
            <div className="searchbox mx-0 mx-md-5 shadow-sm rounded-pill">
              <input
                type="text"
                className="search-textbox"
                placeholder="Ürün, Marka yada Kategori ara..."
                ref={searchInput}
                onChange={() => handleSearch()}
                onBlur={(event) => handleSearchBlur(event)}
              />
              <a className="ico-btn search-btn" onClick={() => handleSearch()}>
                <FaSearch />
              </a>
              <a
                className="ico-btn clear-btn"
                onClick={(event) => handleSearchCancel(event)}
              >
                <FaTimes />
              </a>
            </div>
            <div
              className="dropdown-menu text-muted mx-0 mx-md-5 w-50 search-menu"
              ref={searchDropdown}
            >
              <SearchResults />
            </div>
          </div>
          <div className='d-none'>YAZI yada RESIM</div>
          {/* <a>Get in</a> */}
        </div>
        <nav
          className="navbar navbar-dark bg-dark"
          // style={{ backgroundColor: 'var(--bs-gray)' }}
        >
          <ul
            id="mainNav"
            className="nav nav-pills justify-content-center w-100"
          >
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
                data-bs-offset="0,-1"
              >
                <FaBoxOpen className="me-1" />
                Ürünler
              </a>
              <ul className="dropdown-menu">
                {allMenuTypes.categories &&
                  allMenuTypes.categories.map((category) => {
                    if (category.subCategories.length > 0) {
                      return (
                        <li key={category.id}>
                          <div className="dropend">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#"
                              role="button"
                              id={`category-${category.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {category.name}
                            </a>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`category-${category.id}`}
                            >
                              {category.subCategories.map((subCategory) => {
                                if (subCategory.childCategories.length > 0) {
                                  return (
                                    <li key={subCategory.id}>
                                      <div className="dropend">
                                        <a
                                          className="dropdown-item dropdown-toggle"
                                          href="#"
                                          role="button"
                                          id={`sub-category-${subCategory.id}`}
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          {subCategory.sub_category_name}
                                        </a>
                                        <ul
                                          className="dropdown-menu"
                                          aria-labelledby={`sub-category-${subCategory.id}`}
                                        >
                                          {subCategory.childCategories.map(
                                            (childCategory) => (
                                              <li key={childCategory.id}>
                                                <Link
                                                  className="dropdown-item"
                                                  to={`/urunler?categories=${category.id}&subCategories=${subCategory.id}&childCategories=${childCategory.id}`}
                                                >
                                                  {
                                                    childCategory.child_category_name
                                                  }
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </li>
                                  );
                                }
                                return (
                                  <li key={subCategory.id}>
                                    <Link
                                      className="dropdown-item"
                                      to={`/urunler?categories=${category.id}&subCategories=${subCategory.id}`}
                                    >
                                      {subCategory.sub_category_name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li key={category.id}>
                        <Link
                          className="dropdown-item"
                          to={`/urunler?categories=${category.id}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="nav-link"
              >
                <FaHome className="me-1" />
                Anasayfa
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/kurumsal"
                exact
                activeClassName="active"
                className="nav-link"
              >
                <FaUsers className="me-1" />
                Kurumsal
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
                data-bs-offset="0,-1"
              >
                <FaTags className="me-1" />
                Markalar
              </a>
              <ul className="dropdown-menu">
              {allMenuTypes.brands &&
                  allMenuTypes.brands.map((brand) => {
                    if (brand.subBrands.length > 0) {
                      return (
                        <li key={brand.id}>
                          <div className="dropend">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#"
                              role="button"
                              id={`brand-${brand.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {brand.name}
                            </a>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`brand-${brand.id}`}
                            >
                              {brand.subBrands.map((subBrand) => {
                                return (
                                  <li key={subBrand.id}>
                                    <Link
                                      className="dropdown-item"
                                      to={`/urunler?brands=${brand.id}&subBrands=${subBrand.id}`}
                                    >
                                      {subBrand.sub_brand_name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li key={brand.id}>
                        <Link
                          className="dropdown-item"
                          to={`/urunler?brands=${brand.id}`}
                        >
                          {brand.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
            <li className="nav-item">
              <NavLink
                to="/diger"
                exact
                activeClassName="active"
                className="nav-link"
              >
                <FaLocationArrow className="me-1" />
                Diğer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/iletisim"
                exact
                activeClassName="active"
                className="nav-link"
              >
                <FaMapMarkedAlt className="me-1" />
                İletişim
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
      {/* // end:: Main Nav */}
    </>
  );
};

export default Navbar;
