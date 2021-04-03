import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {
    FaRegStar,
    FaStarHalfAlt,
    FaStar,
  } from 'react-icons/fa';

const Comment = (props) => {
  const {comment} = props;
  const starsSettings = {
    isHalf: true,
    size: 16,
    value: Number(comment.rating) || 0,
    edit: false,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    onChange: (newValue) => {
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

  return (
    <div className="card mb-1">
      <div className="card-body py-2">
          <p className="mb-0">{comment.comment || ''}</p>
          <span className="d-flex align-items-center">
            <ReactStars {...starsSettings} />
            <span className="text-muted mt-1 ms-2">
              {comment.createdDate || "Bilinmeyen"} tarihinde <cite title="Yorum Sahibi">{comment.username || ""} tarafından</cite>
            </span>
          </span>
      </div>
    </div>
  );
};

export default Comment;
