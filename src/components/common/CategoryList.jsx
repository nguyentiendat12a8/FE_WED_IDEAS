import styles from "./styles/categoryList.module.css";
import { useMediaQuery } from "react-responsive";
import Paginator from "./Paginator";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

export const MAX_ITEMS = 5;

function MobileCard({ category, no, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <strong>Action</strong>
          <p className={styles.actions}>
            <DeleteOutlined
              style={{
                cursor: "pointer",
                fontSize: 16,
                color: "#f5365c",
              }}
              onClick={() => onDelete(category._id)}
            />
          </p>
        </div>
        <div className="col">
          <strong>No</strong>
          <p>{no}</p>
        </div>
        <div className="col">
          <strong>ID</strong>
          <p>{category._id}</p>
        </div>
        <div className="col">
          <strong>Category Name</strong>
          <p>{category.categoryName}</p>
        </div>
      </div>
    </div>
  );
}

const CategoryList = ({ list, onEdit, onDelete }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [curPage, setCurPage] = useState(0);

  let listCategoryMarkup = list
    .slice(curPage * MAX_ITEMS, (curPage + 1) * MAX_ITEMS)
    .map((category, index) => (
      <li key={category._id} className={styles.categoryItem}>
        <span className={styles.no}>{index + 1 + curPage * MAX_ITEMS}</span>
        <span>{category._id}</span>
        <span>{category.categoryName}</span>
        <span>
          <div className={styles.actions}>
            <DeleteOutlined
              style={{
                cursor: "pointer",
                fontSize: 16,
                color: "#f5365c",
              }}
              onClick={() => onDelete(category._id)}
            />
          </div>
        </span>
      </li>
    ));

  if (isMobile) {
    listCategoryMarkup = list.map((category, index) => (
      <MobileCard
        no={index + 1}
        key={category._id}
        category={category}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ));
  }

  return (
    <>
      <ul className={styles.categoryList}>
        {!isMobile && (
          <li
            className={[styles.categoryItem, styles.categoryItemHead].join(" ")}
          >
            <strong className={styles.no}>No</strong>
            <strong>ID</strong>
            <strong>Category Name</strong>
            <strong>Action</strong>
          </li>
        )}
        {listCategoryMarkup}
      </ul>
      {!isMobile && (
        <Paginator
          curPage={curPage}
          maxPage={Math.ceil(list.length / MAX_ITEMS)}
          setCurPage={setCurPage}
          scrollAfterClicking={true}
          isLoading={false}
        />
      )}
    </>
  );
};

export default CategoryList;
