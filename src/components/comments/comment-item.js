import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {updateCommentThunk, deleteCommentThunk} from "../../services/comments-thunk";
import {useEffect, useState} from "react";

const CommentItem = ({comment}) => {
    const {currentUser} = useSelector(state => state.user);
    const currentPage = useLocation().pathname;
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newComment, setNewComment] = useState(comment.comment);
    const onSaveClick = async () => {
        await dispatch(updateCommentThunk({
            ...comment,
            comment: newComment
        }));
        setIsEditing(false);
    }

    const onDeleteClick = async () => {
        dispatch(deleteCommentThunk(comment._id));
    }

    return (
        <li className="list-group-item p-3">
            <div className="row">
                <div className="col-10" style={{"color":"#888888"}}>
                    {currentPage.substring(0,7) != "/detail" &&
                        <>For: <Link to={`/detail/${comment.topicID}`}>{comment.topicTitle}</Link><br/></>
                    }
                    {
                        currentPage.substring(0,8) != "/profile" &&
                        <>By: <Link to={`/profile/${comment.author}`}>{comment.author}</Link><br/></>
                    }
                    On: {new Date(comment.date).toLocaleString([], {
                    year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                })}
                </div>
                {currentUser && (currentUser.role == "admin" || currentUser.username == comment.author) &&
                    <>
                        <div className="col-1">
                            <i className={`bi bi-pencil-square ${isEditing? 'text-success' : 'test-dark'}`}
                               style={{"cursor":"pointer"}}
                               onClick={() => setIsEditing(!isEditing)}></i>
                        </div>
                        <div className="col-1">
                            <i className="bi bi-trash text-secondary"
                               style={{"cursor":"pointer"}}
                               onClick={onDeleteClick}></i>
                        </div>
                    </>
                }
            </div>
            <div className="row">
                <div className="col mt-2">
                    {!isEditing && comment.comment}
                </div>
            </div>
            {isEditing &&
                <div className="form-group mt-2">
                    <textarea type="form-control" rows="3" defaultValue={comment.comment}
                              onChange={e => setNewComment(e.target.value)}/><br/>
                    <button class="btn btn-sm btn-primary" onClick={onSaveClick}>Save Changes</button>
                </div>
            }
        </li>
    );
}

export default CommentItem;