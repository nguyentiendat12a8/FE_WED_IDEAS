import React from "react";
import { useDispatch } from "react-redux";
import { getIdeaListAction } from "../../store/actions";
import Input from "./Input";
import "./styles/filterIdeaByProperties.scss";

const FilterIdeaByProperties = () => {
  const dispatch = useDispatch();
  const listPropertiesMarkup = [
    { value: "mostLike", label: "Most Like" },
    { value: "leastLike", label: "Least Like" },
    { value: "mostComment", label: "Most Comment" },
    { value: "leastComment", label: "Least Comment" },
    { value: "mostView", label: "Most View" },
    { value: "leastView", label: "Least View" },
    { value: "mostDislike", label: "Most Dislike" },
    { value: "leastDislike", label: "Least Dislike" },
  ].map((prop) => (
    <option key={prop.value} value={prop.value}>
      {prop.label}
    </option>
  ));

  const onFilter = (e) => {
    const { value } = e.target;
    dispatch(getIdeaListAction(value));
  };

  return (
    <div className="filter-idea__by-properties">
      <Input type="select" onChange={onFilter}>
        {listPropertiesMarkup}
      </Input>
    </div>
  );
};

export default FilterIdeaByProperties;
