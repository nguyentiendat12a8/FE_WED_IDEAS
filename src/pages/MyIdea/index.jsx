import { UnorderedListOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FilterIdeaByProperties from "../../components/common/FilterIdeaByProperties";
import IdeaGrid from "../../components/common/IdeaGrid";

const MyIdea = () => {
  const { role } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const [ideas, setIdeas] = useState([]);

  return (
    <div className="ideas main-content-dashboard">
      <h1 className="title">
        <UnorderedListOutlined />
        <span>List idea</span>
      </h1>
      <div className="justify-end g-1">
        {role === "staff" && (
          <Link to="/staff/idea/form" className="btn btn-outlined">
            Create new idea
          </Link>
        )}
      </div>
      <FilterIdeaByProperties />
      <IdeaGrid setIdeas={setIdeas} />
    </div>
  );
};

export default MyIdea;
