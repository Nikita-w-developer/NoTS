import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFound = () => {
  return (
    <div className={styles.root}>
      😞
      <br />
      <span>Ничего не найдено</span>
      <h1>попробуй другой путь</h1>
    </div>
  );
};
export default NotFound;
