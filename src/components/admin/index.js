import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsersThunk, updateRoleThunk} from "../../services/auth-thunk";

const AdminPageComponent = () => {
    const {currentUser} = useSelector(state => state.user);
    const {users} = useSelector(state => state.userList);
    const [role, setRole] = useState("");
    const dispatch = useDispatch();

    const update = async (user) => {
        if (role != "") {
            dispatch(updateRoleThunk(user));
        }
    };

    const getUsers = async () => {
        dispatch(getAllUsersThunk());
    }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <div className="mt-4 mb-4">
            <h2>Manage Users</h2>
            <div>
                Welcome to the control panel for admins. Here you can view all users and change user roles.
            </div>
            <div className="mt-5">
                {users != undefined && <>
                    <h3>Users</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col fw-bold">Username</div>
                                <div className="col fw-bold">Name</div>
                                <div className="col fw-bold">Email</div>
                                <div className="col fw-bold">Role</div>
                                <div className="col"> </div>
                            </div>
                        </li>
                        {users.filter(u => u.role == "user").map(u =>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col">{u.username}</div>
                                    <div className="col">{u.name}</div>
                                    <div className="col">{u.email}</div>
                                    <div className="col">
                                        <select className="form-select" onChange={(e) => setRole(e.target.value)}>
                                            <option selected value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary btn-sm float-end"
                                                onClick={() => update({...u, role})}>
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className="mt-5">
                        <h3>Admins</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col fw-bold">Username</div>
                                    <div className="col fw-bold">Name</div>
                                    <div className="col fw-bold">Email</div>
                                    <div className="col fw-bold">Role</div>
                                    <div className="col"> </div>
                                </div>
                            </li>
                            {users.filter(u => u.role == "admin").map(u =>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">{u.username}</div>
                                        <div className="col">{u.name}</div>
                                        <div className="col">{u.email}</div>
                                        <div className="col">
                                            <select className="form-select" onChange={(e) => setRole(e.target.value)}>
                                                <option value="user">user</option>
                                                <option selected value="admin">admin</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <button className={`btn btn-primary btn-sm float-end ${currentUser && u.username == currentUser.username? 'disabled' : ''}`}
                                                    onClick={() => update({...u, role})}>
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                    </>
                }
            </div>
        </div>
    );
}

export default AdminPageComponent;