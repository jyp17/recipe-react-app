import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logoutThunk} from "../../services/auth-thunk";

const NavigationComponent = () => {
    const {currentUser} = useSelector(state => state.user);
    const {pathname} = useLocation();
    const paths = pathname.split('/');
    const active = paths[1] === ''? 'home' : paths[1];
    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <div className="container-fluid d-flex">
                <a className="navbar-brand"><i className="bi bi-egg-fried"></i> Recipe Searcher</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className={`nav-link ${active === 'home'?'active':''}`}>
                            <span className="d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        {currentUser != undefined &&
                            <Link to="/profile" className={`nav-link ${active === 'profile' ? 'active' : ''}`}>
                                <span className="d-sm-inline">Profile</span>
                            </Link>
                        }
                    </li>
                    <li className="nav-item">
                        {currentUser && currentUser.role=="admin" &&
                            <Link to="/manage-users" className={`nav-link ${active === 'manage-users'?'active':''}`}>
                                Manage Users
                            </Link>
                        }
                    </li>
                    <li className="nav-item">
                        {currentUser == undefined?
                            <Link to="/login" className={`nav-link ${active === 'login'?'active':''}`}>
                                <span className="d-sm-inline">Login</span>
                            </Link>
                            :
                            <Link to="/login" className={`nav-link ${active === 'login'?'active':''}`}
                                  onClick={() => dispatch(logoutThunk())}>
                                <span className="d-sm-inline">Log Out</span>
                            </Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavigationComponent;