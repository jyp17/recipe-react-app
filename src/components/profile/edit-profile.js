import React, {useState} from "react";
import {updateUserThunk} from "../../services/auth-thunk";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./index.css"

const EditProfileComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const [profile, setProfile] = useState(currentUser);
    const save = async () => {
        await dispatch(updateUserThunk(profile));
        navigate("/profile");
    };
    // add back button to profile
    return(
        <div className="container-md mt-5">
            <i className="bi bi-arrow-left" onClick={() => navigate("/profile")}> Return to your profile</i>
            <h2 className="mt-3">Edit Profile</h2>
            {!profile && <>Please login to view this page.</>}
            {profile &&
                <div className="form-group">
                    <div className="mt-4">
                        <label className="form-label" for="uname-input">Username:</label>
                        <input className="form-control"
                               type="text"
                               id="uname-input"
                               value={profile.username}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       username: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div className="mt-3">
                        <label className="form-label" for="name-input">Name:</label>
                        <input className="form-control"
                               id="name-input"
                               type="text"
                               value={profile.name}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       name: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div className="mt-3 pb-3">
                        <label className="form-label" for="email-input">Email:</label>
                        <input className="form-control"
                               id="email-input"
                               type="text"
                               value={profile.email}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       email: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={save}>Save</button>
                </div>
            }
        </div>
    );
}

export default EditProfileComponent;