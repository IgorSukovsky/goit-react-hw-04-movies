import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import hs from './Header.module.css';
import PropTypes from 'prop-types';

const Header = ({ match }) => {
  return (
    <header className={hs.header}>
      <div className="container">
        <ul className={hs.navList}>
          <li className={hs.navItem}>
            <NavLink
              exact
              to={`${match.url}`}
              className={hs.navLink}
              activeClassName={hs.navLink_active}
            >
              Home
            </NavLink>
          </li>
          <li className={hs.navItem}>
            <NavLink
              to={`${match.url}movies`}
              className={hs.navLink}
              activeClassName={hs.navLink_active}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
Header.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};
export default withRouter(Header);
