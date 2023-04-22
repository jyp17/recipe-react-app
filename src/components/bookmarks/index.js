import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {findBookmarksByUserThunk} from "../../services/bookmarks-thunk";
import BookmarkItem from "./bookmark-item";
const BookmarkComponent = ({username}) => {
    const {bookmarks} = useSelector(state => state.bookmarks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findBookmarksByUserThunk(username))
    }, []);

    return(
        <div className="list-group">
            {bookmarks.length == 0 && <>No bookmarks yet.</>}
            {bookmarks.map(bk => <BookmarkItem key={bk._id} bookmark={bk} username={username} />)}
        </div>
    );
}

export default BookmarkComponent;