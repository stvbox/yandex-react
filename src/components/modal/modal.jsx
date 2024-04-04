import { useEffect, useState } from "react";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { ModalWindow } from "./modal-window/modal-window";


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
