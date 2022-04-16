import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/modal.form.module.css";
import { FaTimes } from "react-icons/fa";
import { hideModalAction } from "../../store/actions/globalActions";
import Backdrop from "./Backdrop";

const ModalForm = ({
  onSubmit,
  title,
  children,
  btnTitle,
  isLoading,
  closeAction,
  btnCancelTitle,
}) => {
  const { modal } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const hide = () => {
    if (closeAction) {
      closeAction();
    }
    dispatch(hideModalAction());
  };

  return (
    <>
      <div
        className={[styles.modal, modal.isShow ? styles.show : ""].join(" ")}
      >
        <div className={styles.modalHeader}>
          <h1 className={styles.titleTop}>{title}</h1>
          <button onClick={hide}>
            <FaTimes size={18} />
          </button>
        </div>
        <div className={styles.children}>{children}</div>
        <div className={styles.buttonRow}>
          <button
            onClick={onSubmit}
            className="btn btn-outlined"
            disabled={isLoading}
          >
            {btnTitle}
          </button>
          {btnCancelTitle && (
            <button
              onClick={hide}
              className="btn btn-outlined-red"
              disabled={isLoading}
            >
              {btnCancelTitle}
            </button>
          )}
        </div>
      </div>
      <Backdrop open={modal.isShow} onClick={hide} disabled={isLoading} />
    </>
  );
};

export default ModalForm;
