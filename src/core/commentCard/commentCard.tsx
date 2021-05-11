import React, { useState, useEffect } from "react";
import Comment from "../../models/comment";
import "./commentCard.css";
import { ReactComponent as Star } from "../../assets/icons/star.svg";

const CommentCard: React.FC<Comment> = ({ name, content, rating }) => {
  const [stars, setStars] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    if (rating) {
      const star = <Star height={14} />;
      let arr: Array<JSX.Element> = [];
      for (let i = 0; i < rating; i++) {
        //TODO: resolve problem with key
        arr.push(star);
      }
      setStars(arr);
    }
  }, [rating]);

  return (
    <div className="comment-card">
      <div className="avatar">
        <span>{name[0]}</span>
      </div>
      <div>
        <span className="comment-name">{name}</span>: <span>{content}</span>
      </div>
      <div className="comment-rating">{stars}</div>
    </div>
  );
};

export default CommentCard;
