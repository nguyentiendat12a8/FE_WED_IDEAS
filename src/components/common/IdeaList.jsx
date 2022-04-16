import styles from "./styles/categoryList.module.css";
import { useMediaQuery } from "react-responsive";
import Paginator from "./Paginator";
import { useState } from "react";
import { MAX_ITEMS } from "./CategoryList";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MobileCard(props) {
  const { idea, no, role } = props;
  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <strong />
          <Link
            className="btn btn-sm"
            to={`/${role.toLowerCase()}/idea/${idea._id}`}
          >
            View
          </Link>
        </div>
        <div className="col">
          <strong>No</strong>
          <p>{no}</p>
        </div>
        <div className="col">
          <strong>ID</strong>
          <p>{idea._id}</p>
        </div>
        <div className="col">
          <strong>Content</strong>
          <p>{idea.ideasContent}</p>
        </div>
        <div className="col">
          <strong>Category Name</strong>
          <p>{idea.categoryName}</p>
        </div>
        <div className="col">
          <strong>Deparment Name</strong>
          <p>{idea.departmentName}</p>
        </div>
      </div>
    </div>
  );
}

const IdeaList = ({ list }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [curPage, setCurPage] = useState(0);
  const { role } = useSelector((state) => state.auth);

  let listIdeaMarkup = list
    .slice(curPage * MAX_ITEMS, (curPage + 1) * MAX_ITEMS)
    .map((idea, index) => (
      <li key={idea._id} className={styles.categoryItem}>
        <span className={styles.no}>{index + 1 + curPage * MAX_ITEMS}</span>
        <span>{idea._id}</span>
        <span>{idea.ideasContent}</span>
        <span>{idea.categoryName}</span>
        <span>{idea.departmentName}</span>
        <span>
          <Link
            className="btn btn-sm"
            to={`/${role.toLowerCase()}/idea/${idea._id}`}
          >
            View
          </Link>
        </span>
      </li>
    ));

  if (isMobile) {
    listIdeaMarkup = list.map((idea, index) => (
      <MobileCard no={index + 1} key={idea._id} idea={idea} role={role} />
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
            <strong>Content</strong>
            <strong>Category Name</strong>
            <strong>Deparment Name</strong>
            <strong />
          </li>
        )}
        {listIdeaMarkup}
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

export default IdeaList;
