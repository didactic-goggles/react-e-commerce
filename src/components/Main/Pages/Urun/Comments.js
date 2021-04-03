import React, { useState } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactStars from 'react-rating-stars-component';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import Comment from './Comment';

import API from '../../../../api';

const Comments = (props) => {
  const { comments, userDetails, productId } = props;
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const ratingInputSettings = {
    isHalf: true,
    size: 20,
    value: newRating,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    onChange: (newValue) => setNewRating(newValue),
  };

  const handleNewComment = async () => {
    console.log(newComment, newRating);
    const newCommentBody = {
      user_id: '4',
      product_id: productId,
      comment: newComment,
      rating: newRating,
      createdDate: moment().format('YYYY-MM-DD')
    }
    const newCommentFormData = new FormData();
    Object.keys(newCommentBody).forEach(key => newCommentFormData.append(key, newCommentBody[key]));
    const newCommentResponse = await API.post('/comment.php', newCommentFormData);
    console.log(newCommentResponse);
  }
  return (
    <div id="comments">
      <div className="my-3">
        <h4 className="mb-3">Yorumlar</h4>
        {comments.length > 0 ? (
          <PerfectScrollbar>
            <div className="comments-section">
              {comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            </div>
          </PerfectScrollbar>
        ) : (
          <h5>Bu ürün henüz yorumlanmamış. İlk yorumu siz ekleyin</h5>
        )}
      </div>
      {userDetails.user ? (
        <div>
          <form>
            <h5>Yorum Ekle</h5>
            <div className="form-group">
              <label htmlFor="newComment_comment">Yorum</label>
              <textarea
                className="form-control"
                rows="2"
                id="newComment_comment"
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="newComment_rating">Puan</label>
              <ReactStars {...ratingInputSettings} id="newComment_rating"/>
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary" onClick={event => handleNewComment()}>
                Gönder
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h5>
          Yorum eklemek için lütfen <NavLink to="/giris">giriş yapın</NavLink>
        </h5>
      )}
    </div>
  );
};

export default Comments;
