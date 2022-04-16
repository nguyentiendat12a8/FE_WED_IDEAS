import styles from "./userDataList.module.css";
import { useMediaQuery } from "react-responsive";
import Paginator from "../common/Paginator";
import { useState } from "react";
import { EditOutlined, RedoOutlined } from "@ant-design/icons";
import { MAX_ITEMS } from "../common/CategoryList";
import Loader from "../common/Loader";

function MobileCard({
  user,
  no,
  onNavigate,
  type,
  onRestore,
  onDeletePermanent,
}) {
  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <strong>Action</strong>
          {type === "trash" ? (
            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <RedoOutlined
                style={{
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#1890ff",
                  textAlign: "left",
                }}
                onClick={() => onRestore(user._id)}
              />
            </div>
          ) : (
            <EditOutlined
              style={{
                cursor: "pointer",
                fontSize: 18,
                color: "#1890ff",
                textAlign: "left",
              }}
              onClick={() => onNavigate(user._id)}
            />
          )}
        </div>
        <div className="col">
          <strong>No</strong>
          <p>{no}</p>
        </div>
        <div className="col">
          <strong>ID</strong>
          <p>{user._id}</p>
        </div>
        <div className="col">
          <strong>Email</strong>
          <p>{user.accountEmail}</p>
        </div>
        <div className="col">
          <strong>Role</strong>
          <p>{user.roleName}</p>
        </div>
      </div>
    </div>
  );
}

const UserDataList = ({
  isLoading,
  list,
  onNavigate,
  type,
  onRestore,
  onDeletePermanent,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [curPage, setCurPage] = useState(0);

  let listUserMarkup = list
    .slice(curPage * MAX_ITEMS, (curPage + 1) * MAX_ITEMS)
    .map((user, index) => (
      <li key={user._id} className={styles.userItem}>
        <span className={styles.no}>{index + 1 + curPage * MAX_ITEMS}</span>
        <span>{user._id}</span>
        <span>{user.accountEmail}</span>
        <span>{user.roleName}</span>
        <span>
          {type === "trash" ? (
            <div
              style={{
                display: "flex",
                width: 60,
              }}
            >
              <RedoOutlined
                style={{
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#1890ff",
                  textAlign: "left",
                }}
                onClick={() => onRestore(user._id)}
              />
            </div>
          ) : (
            <EditOutlined
              style={{
                cursor: "pointer",
                fontSize: 18,
                color: "#1890ff",
                textAlign: "left",
              }}
              onClick={() => onNavigate(user._id)}
            />
          )}
        </span>
      </li>
    ));

  if (isMobile) {
    listUserMarkup = list.map((user, index) => (
      <MobileCard
        no={index + 1}
        key={user._id}
        user={user}
        onNavigate={onNavigate}
        type={type}
        onRestore={onRestore}
      />
    ));
  }

  if (isLoading) {
    return (
      <div className={styles.userList}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ul className={styles.userList}>
        {!isMobile && (
          <li className={[styles.userItem, styles.userItemHead].join(" ")}>
            <strong className={styles.no}>No</strong>
            <strong>ID</strong>
            <strong>Email</strong>
            <strong>Role</strong>
            <strong>Action</strong>
          </li>
        )}
        {listUserMarkup}
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

export default UserDataList;
