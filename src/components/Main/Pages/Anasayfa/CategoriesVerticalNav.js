import React from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useAuthState } from '../../../../context';
const CategoriesVerticalNav = () => {
  // const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  console.log(userDetails);
  return (
    <div className="nav-categories card card-body ps-1 shadow-sm">
      <PerfectScrollbar>
        <nav
          className="bd-links"
          id="bd-docs-nav"
          aria-label="Docs navigation"
        >
          <ul className="list-unstyled mb-0 py-3 pt-md-1">
            {userDetails.categories &&
              userDetails.categories.map((category) => {
                if (category.subCategories.length > 0) {
                  return (
                    <li key={category.id} className="mb-1">
                      <button
                        className="btn d-inline-flex align-items-center rounded"
                        data-bs-toggle="collapse"
                        data-bs-target={`#categories-vertical-nav-category-${category.id}`}
                        aria-expanded="true"
                      >
                        {category.name}
                      </button>

                      <div
                        className="collapse show"
                        id={`categories-vertical-nav-category-${category.id}`}
                      >
                        <ul className="list-unstyled fw-normal pb-1 small">
                          {category.subCategories.map((subCategory) => {
                            if (subCategory.childCategories.length > 0) {
                              return (
                                <li key={subCategory.id} className="mb-1">
                                  <button
                                    className="btn d-inline-flex align-items-center rounded collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#categories-vertical-nav-category-sub-category-${subCategory.id}`}
                                    aria-expanded="false"
                                  >
                                    {subCategory.sub_category_name}
                                  </button>

                                  <div
                                    className="collapse"
                                    id={`categories-vertical-nav-category-sub-category-${subCategory.id}`}
                                  >
                                    <ul className="list-unstyled fw-normal pb-1 small">
                                      {subCategory.childCategories.map(
                                        (childCategory) => (
                                          <li key={childCategory.id}>
                                            <Link
                                              to={`/urunler?categories=${category.id}&subCategories=${subCategory.id}&childCategories=${childCategory.id}`}
                                              className="d-inline-flex align-items-center rounded"
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
                                  to={`/urunler?categories=${category.id}&subCategories=${subCategory.id}`}
                                  className="d-inline-flex align-items-center rounded fs-6"
                                  style={{fontWeight: '600'}}
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
                  <li key={category.id} className="mb-1">
                    <Link
                      to={`/urunler?categories=${category.id}`} 
                      className="d-inline-flex align-items-center rounded"
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </PerfectScrollbar>
    </div>
  );
};

export default CategoriesVerticalNav;
