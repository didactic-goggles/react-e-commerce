/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaSearch,
  FaTimes,
  FaHome,
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
    products: [],
  });
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

  useEffect(() => {
    getAllBrandsAndCategories();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
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
              category_name: category.name,
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
    searchDropdown.current.classList.remove('show');
    setSearchResults(null);
  };

  const handleSearchCancel = (event) => {
    setSearchResults(null);
    searchDropdown.current.classList.remove('show');
    searchInput.current.value = "";
  };

  const SearchResults = () => {
    if (searchResults == null) return <h5 className="px-3 py-2">Sonuç bulunamadı...</h5>;
    // else if(searchResults === 'empty') return <h5>Yazmaya devam edin...</h5>;
    return (
      <>
        {searchResults.categories.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Kategoriler</h6>
            {searchResults.categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="list-group-item list-group-item-action"
              >
                {category.name}
              </a>
            ))}
          </div>
        )}
        {searchResults.subCategories.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Alt Kategoriler</h6>
            {searchResults.subCategories.map((subCategory, index) => (
              <a
                key={index}
                href="#"
                className="list-group-item list-group-item-action"
              >
                <span className="d-block">{subCategory.sub_category_name}</span>
                <small className="text-muted">
                  {subCategory.category_name}
                </small>
                <span> &gt; </span>
                {}
              </a>
            ))}
          </div>
        )}
        {searchResults.childCategories.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Ürün Tipi</h6>
            {searchResults.childCategories.map((childCategory, index) => (
              <a
                key={index}
                href="#"
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
              </a>
            ))}
          </div>
        )}
        {searchResults.brands.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Markalar</h6>
            {searchResults.brands.map((brand, index) => (
              <a
                key={index}
                href="#"
                className="list-group-item list-group-item-action"
              >
                {brand.name}
              </a>
            ))}
          </div>
        )}
        {searchResults.products.length > 0 && (
          <div className="list-group">
            <h6 className="dropdown-header text-primary">Ürünler</h6>
            {searchResults.products.map((product, index) => (
              <a
                key={index}
                href="#"
                className="list-group-item list-group-item-action"
              >
                {product.name}
              </a>
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
          <NavLink to="/" exact className="text-decoration-none">
            <h3 className="mb-0 text-dark">LOGO</h3>
          </NavLink>
          <div className="dropdown w-100">
            <div className="searchbox mx-0 mx-md-5 shadow-sm">
              <input
                type="text"
                className="search-textbox"
                placeholder="Ürün, Marka yada Kategori ara..."
                ref={searchInput}
                onChange={(event) => handleSearch(event)}
                onBlur={(event) => handleSearchBlur(event)}
              />
              <a className="ico-btn search-btn">
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
          <div>YAZI yada RESIM</div>
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
            <li className="nav-item">
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="nav-link"
              >
                <FaHome className="me-1" />
                Anasayfa
              </NavLink>
            </li>
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
                  allMenuTypes.brands.map((brand) => (
                    <li key={brand.id}>
                      <a className="dropdown-item" href="#">
                        {brand.name}
                      </a>
                    </li>
                  ))}
              </ul>
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
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                >
                                                  {
                                                    childCategory.child_category_name
                                                  }
                                                </a>
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
                                    <a className="dropdown-item" href="#">
                                      {subCategory.sub_category_name}
                                    </a>
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
                        <a className="dropdown-item" href="#">
                          {category.name}
                        </a>
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
