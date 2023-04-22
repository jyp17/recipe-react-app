import {Link} from "react-router-dom";
import "./index.css"

const LatestCommentComponent = ({comment}) => {
    return(
        <ul className="d-flex list-group-item">
            <div className="col-1 pt-1">
                <i className="bi bi-pen"> </i>
            </div>
            <div className="col-11">
                <Link to={`/profile/${comment.author}`}>{comment.author}</Link>
                <span> wrote on </span>
                <Link to={`/detail/${comment.topicID}`}>{comment.topicTitle}</Link>:
                <div className="text-truncate text-black">{comment.comment}</div>
                {new Date(comment.date).toLocaleString([], {
                    year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                })}
            </div>
        </ul>
    );
}

export default LatestCommentComponent;