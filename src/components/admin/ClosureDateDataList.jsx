import styles from "./userDataList.module.css";
import { useMediaQuery } from "react-responsive";
import Paginator from "../common/Paginator";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MAX_ITEMS } from "../common/CategoryList";
import Loader from "../common/Loader";

function MobileCard({ closureDate, no, onNavigate }) {
  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <strong />
          <p>
            <EditOutlined
              style={{
                cursor: "pointer",
                fontSize: 16,
                color: "#1890ff",
              }}
              onClick={() => onNavigate(closureDate._id)}
            />
          </p>
        </div>
        <div className="col">
          <strong>No</strong>
          <p>{no}</p>
        </div>
        <div className="col">
          <strong>Fisrt closure date </strong>
          <p>{closureDate.finalClosureDate}</p>
        </div>
        <div className="col">
          <strong>Final closure date </strong>
          <p>{closureDate.finalClosureDate}</p>
        </div>
        <div className="col">
          <strong>Department Name</strong>
          <p>{closureDate.departmentName}</p>
        </div>
      </div>
    </div>
  );
}

const ClosureDateDataList = ({ isLoading, list, onNavigate }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [curPage, setCurPage] = useState(0);

  let listClosureDateMarkup = list
    .slice(curPage * MAX_ITEMS, (curPage + 1) * MAX_ITEMS)
    .map((closureDate, index) => (
      <li key={closureDate._id} className={styles.userItem}>
        <span className={styles.no}>{index + 1 + curPage * MAX_ITEMS}</span>
        <span>{closureDate.firstClosureDate}</span>
        <span>{closureDate.finalClosureDate}</span>
        <span>{closureDate.departmentName}</span>
        <span>
          <EditOutlined
            style={{
              cursor: "pointer",
              fontSize: 18,
              color: "#1890ff",
            }}
            onClick={() => onNavigate(closureDate._id)}
          />
        </span>
      </li>
    ));

  if (isMobile) {
    listClosureDateMarkup = list.map((closureDate, index) => (
      <MobileCard
        no={index + 1}
        key={closureDate._id}
        closureDate={closureDate}
        onNavigate={onNavigate}
      />
    ));
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ul className={styles.userList}>
        {!isMobile && (
          <li className={[styles.userItem, styles.userItemHead].join(" ")}>
            <strong className={styles.no}>No</strong>
            <strong>Fisrt closure date </strong>
            <strong>Final closure date </strong>
            <strong>Department Name</strong>
            <strong />
          </li>
        )}
        {listClosureDateMarkup}
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

export default ClosureDateDataList;
