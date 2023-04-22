import {Link} from "react-router-dom";

const LatestBookmarkComponent = ({bookmark}) => {
    return(
        <ul className="d-flex list-group-item">
            <div className="col-1 pt-1">
                <i className="bi bi-bookmark-heart"> </i>
            </div>
            <div className="col-11">
                <Link to={`/profile/${bookmark.user}`}>{bookmark.user}</Link>
                <span> saved: </span><br/>
                <Link to={`/detail/${bookmark.topicID}`}>{bookmark.topicTitle}</Link><br/>
                {new Date(bookmark.date).toLocaleString([], {
                    year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                })}
            </div>
        </ul>
    );
}

export default LatestBookmarkComponent;