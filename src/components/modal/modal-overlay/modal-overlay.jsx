import { React, useCallback, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import style from "./modal-overlay.module.css";

function ModalOverlay({ children, onClick }) {
  const focusRef = createRef();

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    modalRoot.classList.remove("hidden");
    focusRef.current.focus();
    return () => {
      modalRoot.classList.add("hidden");
    };
  }, []);

  const escPressHandler = (event) => {
    if (event.key != "Escape") return;
    onClick();
  };

  return (
    <div
      className={style.overlay}
      onClick={onClick}
      onKeyDown={(e) => escPressHandler(e)}
      tabIndex={0}
      ref={focusRef}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
