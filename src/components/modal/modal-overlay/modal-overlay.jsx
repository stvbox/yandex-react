import { React, useCallback, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import style from "./modal-overlay.module.css";

function ModalOverlay({ children, onClick }) {
  return (
    <div className={style.overlay} onClick={onClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
