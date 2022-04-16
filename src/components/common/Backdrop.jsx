import ReactDOM from "react-dom";
import styles from "./styles/backdrop.module.css";

const Backdrop = ({ open, onClick, disabled }) => {
  const backdropDomNode = document.getElementById("backdrop");

  return ReactDOM.createPortal(
    <div
      className={[styles.c__backdrop, open ? styles.show : ""].join(" ")}
      onClick={disabled ? null : onClick}
    />,
    backdropDomNode
  );
};

export default Backdrop;
