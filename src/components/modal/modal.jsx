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
  const modalRoot = useMemo(() => {
    return document.getElementById("modal-root");
  });

  return createPortal(
    <ModalOverlay onClick={closeHandler}>
      <ModalWindow title={title} closeHandler={closeHandler}>
        {children}
      </ModalWindow>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default Modal;
