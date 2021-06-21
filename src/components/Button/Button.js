import React from "react";
import bs from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ getNewPage }) => {
  return (
    <button
      className={bs.Button}
      type="button"
      data-action="load-more"
      onClick={getNewPage}
    >
      UP
    </button>
  );
};
Button.propTypes = {
  getNewPage: PropTypes.func.isRequired,
};
export default Button;
