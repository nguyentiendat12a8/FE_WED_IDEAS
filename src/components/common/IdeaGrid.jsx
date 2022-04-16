import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdeaListAction } from "../../store/actions";
import { dislikeIdeaRequest, likeIdeaRequest } from "../../store/request";
import IdeaItem from "./IdeaItem";
import Loader from "../common/Loader";
import "./styles/ideaGrid.scss";
import Paginator from "./Paginator";
import { MAX_ITEMS } from "./CategoryList";
import { useLocation } from "react-router-dom";

const IdeaGrid = ({ title, setIdeas }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { ideas } = useSelector((state) => state.idea);
  const { role } = useSelector((state) => state.auth);
  const [curPage, setCurPage] = useState(0);
  const isMyIdea = pathname.includes("/staff/idea") && role === "staff";

  useEffect(() => {
    dispatch(getIdeaListAction("", isMyIdea));
  }, [dispatch, isMyIdea]);

  useEffect(() => {
    if (setIdeas && ideas.list.length) {
      setIdeas(ideas.list);
    }
  }, [ideas, setIdeas]);

  const likeIdeaHandler = (ideaId) =>
    likeIdeaRequest(ideaId).then((res) => {
      dispatch(getIdeaListAction("", isMyIdea));
    });

  const dislikeIdeaHandler = (ideaId) =>
    dislikeIdeaRequest(ideaId).then((res) => {
      dispatch(getIdeaListAction("", isMyIdea));
    });

  return (
    <div className="idea-grid">
      {title && <h1 className="title">All idea</h1>}
      {ideas.isLoading ? (
        <Loader />
      ) : (
        <div className="idea-items">
          {ideas.list
            .slice(curPage * MAX_ITEMS, (curPage + 1) * MAX_ITEMS)
            .map((ideaItem) => (
              <IdeaItem
                key={ideaItem._id}
                ideaItem={ideaItem}
                likeIdeaHandler={likeIdeaHandler}
                dislikeIdeaHandler={dislikeIdeaHandler}
                role={role?.toLowerCase()}
              />
            ))}
        </div>
      )}
      <Paginator
        curPage={curPage}
        maxPage={Math.ceil(ideas.list.length / MAX_ITEMS)}
        setCurPage={setCurPage}
        scrollAfterClicking={true}
        isLoading={false}
      />
    </div>
  );
};

export default IdeaGrid;
