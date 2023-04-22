import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router";
import { getUserByNameThunk } from "../../services/auth-thunk";
import BookmarkComponent from "../bookmarks";
import CommentComponent from "../comments";
import "./index.css"

function ProfileComponent() {
    const {uname} = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchProfile = async (name) => {
        const {payload} = await dispatch(getUserByNameThunk(name));
        setProfile(payload);
    }

    useEffect(() => {
        if (uname == undefined && currentUser != undefined) {
            fetchProfile(currentUser.username);
        } else if (uname != undefined) {
            fetchProfile(uname);
        }
    }, []);

    return (
        <div className="container-md mt-5">
            {!profile && <>Please login to view this page.</>}
            {profile && (
                <div>
                    <div className="d-flex justify-content-between">
                        {uname == undefined? <h3>Hi, <span className="text-danger">{profile.name}</span>!</h3> :
                            <h3 className="text-secondary">{profile.name}</h3>}
                        {currentUser && profile._id == currentUser._id &&
                            <button className="btn btn-primary" onClick={() => navigate("/edit-profile")}>Edit Profile</button>
                        }
                    </div>
                    <h5>@{profile.username}</h5>
                    <div className="d-flex">
                        <div className="me-5">
                            <i className="d-none d-md-inline-block bi bi-calendar-check"></i> Joined on {new Date(profile.joinedOn)
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