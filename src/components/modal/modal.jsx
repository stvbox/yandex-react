import { useEffect, useState } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import style from "./modal.module.css";


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

export function Modal({ title, children, closeHandler }) {
  const [modalsWrapper, setModalsWrapper] = useState(null);

  useEffect(() => {
    setModalsWrapper(document.getElementById("modals"));

    function closeByEscape(event) {
      if (event.key === "Escape") {
        closeHandler();
      }
    }

    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (modalsWrapper && createPortal(
    <ModalOverlay onClick={closeHandler}>
      <ModalWindow title={title} closeHandler={closeHandler}>
        {children}
      </ModalWindow>
    </ModalOverlay>,
    modalsWrapper)
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
};
