import React, { useState, useEffect } from 'react';
// import { useHistory} from 'react-router-dom';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactStars from 'react-rating-stars-component';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import Comment from './Comment';

import API from '../../../../api';

const Comments = (props) => {
  console.log('Rendering => Comments');
  const { comments, userDetails, productId } = props;
  const [allComments, setAllComments] = useState(comments);
  // const history = useHistory()
  const isUserCommentedThis = allComments.filter(comment => userDetails.user && Number(comment.userId) === Number(userDetails.user.id)).length > 0;
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  // let allCommentsObject;
  // if(allComments.length > 0) {
  //   console.log(allComments);
  //   allCommentsObject=  <PerfectScrollbar>
  //     <div className="comments-section">
  //       {allComments.map((comment) => (
  //         <Comment comment={comment} key={comment.id} />
  //       ))}
  //     </div>
  //   </PerfectScrollbar>;
  // } else {
  //   allCommentsObject = <h5>Bu ürün henüz yorumlanmamış. İlk yorumu siz ekleyin</h5>;
  // }
  const [allCommentsObject, setAllCommentsObject] = useState(
    allComments.length > 0 ? <PerfectScrollbar>
        <div className="comments-section">
          {allComments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </PerfectScrollbar> : <h5>Bu ürün henüz yorumlanmamış. İlk yorumu siz ekleyin</h5>
  );
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
    const newCommentBody = {
      user_id: userDetails.user.id,
      product_id: productId,
      comment: newComment,
      rating: newRating,
      createdDate: moment().format('YYYY-MM-DD')
    }
    const newCommentFormData = new FormData();
    Object.keys(newCommentBody).forEach(key => newCommentFormData.append(key, newCommentBody[key]));
    const newCommentResponse = await API.post('/comment.php', newCommentFormData);
    console.log(newCommentResponse);
    // history.go(0);
    const tempAllComments = allComments;
    tempAllComments.push({
      userId: userDetails.user.id,
      username: userDetails.user.username,
      product_id: productId,
      comment: newComment,
      rating: newRating,
      createdDate: moment().format('YYYY-MM-DD'),
      id: 'newComment'
    });
    console.log(tempAllComments);
    setAllComments(tempAllComments);
    if(allComments.length > 0) {
      console.log(allComments);
      setAllCommentsObject(<PerfectScrollbar>
        <div className="comments-section">
          {allComments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </PerfectScrollbar>);
    } else {
      setAllCommentsObject(<h5>Bu ürün henüz yorumlanmamış. İlk yorumu siz ekleyin</h5>);
    }
  }

  useEffect(() => {
    console.log('useEffect');
    setNewComment('');
    setNewRating(0);
  }, [allComments]);
  return (
    <div id="comments">
      <div className="my-3">
        {/* <h4 className="mb-3">Yorumlar</h4> */}
        {allCommentsObject}
      </div>
      {userDetails.user && !isUserCommentedThis? (
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
      ) : ( isUserCommentedThis ? <h5>
        Bu ürünü yorumladınız
      </h5> : 
        <h5>
          Yorum eklemek için lütfen <NavLink to="/giris">giriş yapın</NavLink>
        </h5>
      )}
    </div>
  );
};

export default Comments;
