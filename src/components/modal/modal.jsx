import { createRef, useCallback, useEffect, useMemo } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function ModalWindow({ title, children, closeHandler }) {
  const clickInterceptor = (event) => {
    event.stopPropagation();
  };

  return (
    <div onClick={clickInterceptor} className={style.window}>
      <div className={style.header}>
        <p className={`text text_type_main-large ${style.title}`}>{title}</p>
        <div onClick={closeHandler} className={`${style.close} ml-10`}>
          <CloseIcon type="primary" />
        </div>
      </div>
      {children}
    </div>
  );
}

function Modal({ title, children, closeHandler }) {
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeHandler();
      }
    }
    document.addEventListener("keydown", closeHandler);
    return () => {
      document.removeEventListener("keydown", closeHandler);
    };
  }, []);

  return createPortal(
    <ModalOverlay onClick={closeHandler}>
      <ModalWindow title={title} closeHandler={closeHandler}>
        {children}
      </ModalWindow>
    </ModalOverlay>,
    document.body
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default Modal;
