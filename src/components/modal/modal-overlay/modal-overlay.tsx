import PropTypes from "prop-types";
import style from "./modal-overlay.module.css";
import { FC, MouseEventHandler, ReactNode } from "react";


interface ModalOverlayCompProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const ModalOverlay: FC<ModalOverlayCompProps> = ({ children, onClick }) => {
  return (
    <div className={style.overlay} onClick={onClick}>
      {children}
    </div>
  );
}

// ModalOverlay.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   //children: PropTypes.object,
// };
