import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {findCommentByTopicThunk, findCommentByAuthorThunk} from "../../services/comments-thunk";
import CommentItem from "./comment-item";
const CommentComponent = ({topicID, username}) => {
    const {comments} = useSelector(state => state.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        if (username == undefined) {
            dispatch(findCommentByTopicThunk(topicID))
        } else {
            dispatch(findCommentByAuthorThunk(username))
        }
    }, []);

    return(
        <div className="list-group mt-4">
            {comments.length == 0 && <>No comments yet.</>}
            {comments.map(com => <CommentItem key={com._id} comment={com}/>)}
        </div>
    );
}

export default CommentComponent;