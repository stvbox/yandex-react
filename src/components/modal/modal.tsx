import { FC, ReactNode, useEffect, useState } from "react";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { ModalWindow } from "./modal-window/modal-window";


interface IModalCompProps {
  title: string;
  children: ReactNode;
  closeHandler: (...args: any[]) => any;
}

export const Modal: FC<IModalCompProps> = ({ title, children, closeHandler }) => {
  const [modalsWrapper, setModalsWrapper] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalsElement = document.getElementById("modals");
    if (modalsElement) {
      setModalsWrapper(modalsElement);
    }

    function closeByEscape(event: any) {
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
