import React, {useState} from "react";
import {createCommentThunk} from "../../services/comments-thunk";
import {useDispatch} from "react-redux";

const AddComment = ({user, topicID, topicTitle}) => {
    let [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentClickHandler = async () => {
        const newComment = {
            topicID: topicID,
            topicTitle: topicTitle,
            author: user,
            comment: comment
        }
        dispatch(createCommentThunk(newComment));
    }

    return(
        <div className="row m-1">
            <textarea value={comment} placeholder="Write a comment here!"
                 className="form-control"
                 onChange={(event) => setComment(event.target.value)}>
            </textarea>
            <div>
                <button className="btn btn-primary float-end mt-2 pt-1 ps-3 pe-3 pb-1"
                        onClick={commentClickHandler}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default AddComment;