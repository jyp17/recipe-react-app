import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import { getUserByNameThunk } from "../../services/auth-thunk";
import {findAllFollowsThunk, followThunk, unfollowThunk} from "../../services/follow-thunk";
import BookmarkComponent from "../bookmarks";
import CommentComponent from "../comments";
import "./index.css"
import {Link} from "react-router-dom";

function ProfileComponent() {
    const {uname} = useParams();
    const {currentUser} = useSelector((state) => state.user);
    const {follows} = useSelector((state) => state.follows);
    const [profile, setProfile] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchFollows = async () => {
        await dispatch(findAllFollowsThunk());
    }
    const followUser = async () => {
        const follow = {follower: currentUser.username, followed: profile.username};
        await dispatch(followThunk(follow));
    }

    const unfollowUser = async (follower, followed) => {
        const follow = {follower: currentUser.username, followed: profile.username};
        await dispatch(unfollowThunk(follow));
    }

    const fetchProfile = async (name) => {
        const {payload} = await dispatch(getUserByNameThunk(name));
        setProfile(payload);
    }

    useEffect(() => {
        if (currentUser != undefined && uname == undefined) {
            fetchProfile(currentUser.username);
        } else if (uname != undefined) {
            fetchProfile(uname);
        }
        fetchFollows();
    }, []);

    return (
        <div className="container-md mt-5">
            {!profile && <>Please login to view this page.</>}
            {profile && (
                <div>
                    <div className="d-flex justify-content-between">
                        {uname == undefined? <h3>Hi, <span className="text-danger">{profile.name}</span>!</h3> :
                            <h3 className="text-secondary">{profile.name}</h3>}
                        {currentUser && profile._id == currentUser._id?
                            <button className="btn btn-primary" onClick={() => navigate("/edit-profile")}>Edit Profile</button> :
                            (follows && currentUser?
                                <button className="btn btn-primary" onClick={() => {
                                    follows.find(f => f.follower == currentUser.username && f.followed == profile.username)?
                                    unfollowUser(currentUser.username, profile.username) : followUser(currentUser.username, profile.username)
                                }}>
                                    {follows.find(f => f.follower == currentUser.username && f.followed == profile.username)?
                                        "Unfollow" : "Follow"
                                    }
                                </button> :
                                <></>
                            )
                        }
                    </div>
                    <h5>@{profile.username}</h5>
                    <div className="d-flex fw-bold">
                        <div className="me-5">
                            <Link to={`/profile/${profile.username}/following`}>{follows.filter(f => f.follower == profile.username).length} Following</Link>
                        </div>
                        <div>
                            <Link to={`/profile/${profile.username}/followers`}>{follows.filter(f => f.followed == profile.username).length} Followers</Link>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="me-5">
                            <i className="d-none d-md-inline-block bi bi-calendar-check"></i> Joined {new Date(profile.joinedOn)
                            .toLocaleString([], {
                                year: 'numeric', month: 'short', day: 'numeric'
                            })}
                        </div>
                        {currentUser && profile._id == currentUser._id &&
                            <>
                                <div className="me-5">
                                    <i className="d-none d-md-inline-block bi bi-envelope-at"></i> {profile.email}
                                </div>
                                <div>
                                    <i className="d-none d-md-inline-block bi bi-person-fill"></i> Role: {profile.role}
                                </div>
                            </>
                        }
                    </div>
                    <div className="mt-5 pt-3 pb-2">
                        {currentUser && profile._id == currentUser._id?
                            <h3>Your Bookmarks</h3> : <h3>{profile.name}'s Bookmarks</h3>
                        }
                        <BookmarkComponent username={profile.username} />
                    </div>
                    <div className="mt-5 mb-4">
                        {currentUser && profile._id == currentUser._id?
                            <h3>Your Comments</h3> : <h3>{profile.name}'s Comments</h3>
                        }
                        <CommentComponent username={profile.username} />
                    </div>
                </div>
            )}
        </div>
    );
}
export default ProfileComponent;