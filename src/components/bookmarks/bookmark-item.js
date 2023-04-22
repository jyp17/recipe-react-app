import {useDispatch, useSelector} from "react-redux";
import {deleteBookmarkThunk} from "../../services/bookmarks-thunk"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const BookmarkItem = ({bookmark, username}) => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);

    const removeBookmark = async () => {
        dispatch(deleteBookmarkThunk(bookmark._id))
    }

    return (
        <li className="list-group-item">
            {currentUser != undefined
                && currentUser.username == username
                && <i className="bi bi-bookmark-fill text-danger"
                      style={{"cursor":"pointer"}}
                      onClick={removeBookmark}> </i>}
            <Link to={`/detail/${bookmark.topicID}`}>{bookmark.topicTitle}</Link>
        </li>
    );
}

export default BookmarkItem;