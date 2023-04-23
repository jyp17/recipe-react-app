import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {findByFollowedThunk, findByFollowerThunk} from "../../services/follow-thunk";

const FollowComponent = ({fetchUsersFollowers}) => {
    const {follows} = useSelector(state => state.follows);
    const {uname} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getFollowers = async () => {
        dispatch(findByFollowedThunk(uname));
    }

    const getFollowing = async () => {
        dispatch(findByFollowerThunk(uname));
    }

    useEffect(() => {
        if (fetchUsersFollowers) {
            getFollowers();
        } else {
            getFollowing();
        }
    }, []);

    return(
        <div className="container-md mt-5 mb-4">
            <i className="bi bi-arrow-left" onClick={() => navigate("/profile/" + uname)}> Return to {uname}'s profile</i>
            <h2 className="mt-3">{fetchUsersFollowers? 'Followers' : 'Following'}</h2>
            {follows && follows.length == 0 && <div>No one yet.</div>}
            <ul className="list-group mt-4">
                {follows && follows.map(f =>
                    <li className="list-group-item p-2">
                        <Link to={`/profile/${fetchUsersFollowers? f.follower : f.followed}`}>
                            {fetchUsersFollowers? f.follower : f.followed}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default FollowComponent;