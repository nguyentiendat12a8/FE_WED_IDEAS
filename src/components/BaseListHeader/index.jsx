import React from "react";
import "./index.scss";

const BaseListHeader = ({ btnTile, dispatchAction, hideSearch }) => {
  return (
    <div className={`list-header ${hideSearch ? "flex-end" : ""}`}>
      {hideSearch ? null : (
        <form>
          <input type="text" />
          <button className="btn btn-search">Search</button>
        </form>
      )}
      {btnTile && (
        <button className="btn" onClick={dispatchAction}>
          {btnTile}
        </button>
      )}
    </div>
  );
};

export default BaseListHeader;
