import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk, registerThunk } from "../../services/auth-thunk";
import "./index.css"
function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            const res = await dispatch(loginThunk({ username, password }));
            if (res.error) {
                alert("Invalid username and/or password.")
            } else {
                navigate("/");
            }

        } catch (e) {
            alert(e);
        }
    };

    const handleSignup = async () => {
        try {
            const role = isAdmin? "admin" : "user";
            const res = await dispatch(registerThunk({username, password, name, email, role}));
            if (res.error) {
                alert("This username already exists.")
            } else {
                navigate("/");
            }
        } catch (e) {
            alert(e)
        }
    };

    return (
        <div className="container-md p-5">
            {isRegistering? <h1>Sign Up</h1> : <h1>Login</h1>}
            <form className="pt-1 pb-1">
                <div className="pt-3">
                    <label for="usernameInput">Username*</label>
                    <input id="usernameInput"
                           className="form-control"
                           type="text" value={username}
                           required onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="pt-3">
                    <label for="pwInput">Password*</label>
                    <input id="pwInput"
                           className="form-control"
                           type="password" value={password}
                           required onChange={(event) => setPassword(event.target.value)}/>
                </div>
                {isRegistering?
                    <>
                        <div className="pt-3">
                            <label for="name-input">Name</label>
                            <input id="name-input" className="form-control" type="text"
                                   placeholder="John Doe" value={name}
                                   onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="pt-3">
                            <label for="email-input">Email</label>
                            <input id="email-input" className="form-control" type="text"
                                   placeholder="jdoe@email.com" value={email}
                                   onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="pt-3 form-check">
                            <label for="check-admin">Signing up as admin?</label>
                            <input id="check-admin" className="form-check-input" type="checkbox" value={isAdmin}
                                onClick={()=>setIsAdmin(!isAdmin)}/>
                        </div>
                        <button className="mt-3 mb-3 btn btn-primary" type="button" onClick={() => {
                            username == "" || password == ""?
                                alert("Please fill in required fields.") : handleSignup()}}>Sign Up</button>
                    </> :
                    <button className="mt-3 mb-3 btn btn-primary" type="button" onClick={() => {
                        username == "" || password == ""? alert("Please fill in required fields.") : handleLogin()
                    }}>
                        Login
                    </button>}
            </form>
            {isRegistering?
                <a className="" onClick={() => setIsRegistering(false)}>Login</a> :
                <a className="" onClick={() => setIsRegistering(true)}>Sign Up</a>}
        </div>
    );
}
export default LoginComponent;