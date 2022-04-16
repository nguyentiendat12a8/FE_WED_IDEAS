/** @format */

import loaderImg from "../../assets/img/loader.gif";
import styles from "./styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <img src={loaderImg} alt="loader-placeholder" />
    </div>
  );
};

export default Loader;
