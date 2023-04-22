import SearchBarComponent from "../search/search-bar";
import {useEffect, useState} from "react";
import {findRecentBookmarks, findBookmarksByUser} from "../../services/bookmarks-service";
import {findRecentComments, findCommentByAuthor} from "../../services/comments-service";
import {useSelector} from "react-redux";
import LatestBookmarkComponent from "../bookmarks/latest-bookmark";
import LatestCommentComponent from "../comments/latest-comment";
import "./index.css"
const HomeComponent = () => {
    const {currentUser} = useSelector(state => state.user);
    const [comments, setComments] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [userBookmarks, setUserBookmarks] = useState([]);

    const getRecentComments = async () => {
        const recent = await findRecentComments();
        setComments(recent);
    }

    const getRecentBookmarks = async () => {
        const recent = await findRecentBookmarks();
        setBookmarks(recent);
    }

    const getCommentsByUser = async () => {
        const response = await findCommentByAuthor(currentUser.username);
        setUserComments(response.slice(0, 3));
    }

    const getBookmarksByUser = async () => {
        const response = await findBookmarksByUser(currentUser.username);
        setUserBookmarks(response.slice(0, 3));
    }

    useEffect(() => {
        getRecentBookmarks();
        getRecentComments();
        if (currentUser != undefined) {
            getBookmarksByUser();
            getCommentsByUser();
        }
    }, []);

    return (
        <div className="container-md">
            <div className="p-5">
                <h1 className="text-center">Recipe Searcher</h1>
                <>Welcome to Recipe Searcher, where you can look up recipes when you feel like cooking something different than usual,
                    need a crowd-pleaser for a dinner party, or just aren't sure what to eat. Get started by searching up some recipes!</>
            </div>
            <h2>What will you eat today?</h2>
            <SearchBarComponent />
            <div className="row m-4"></div>
            {currentUser &&
                <div className="mt-5 pt-3">
                    <h3>Your Recent Activity</h3>
                    <div className="row gx-5 gy-4">
                        <div className="col-sm-12 col-md" style={{"min-width":"0"}}>
                            <div className="p-3 border border-1 bg-light">
                                <h5 className="mt-2">Your Comments</h5>
                                {
                                    userComments && userComments.map(c =>
                                        <LatestCommentComponent comment={c} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-sm-12 col-md">
                            <div className="p-3 border border-1 bg-light">
                                <h5 className="mt-2">Your Bookmarks</h5>
                                {
                                    userBookmarks && userBookmarks.map(b =>
                                        <LatestBookmarkComponent bookmark={b} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="row m-4"></div>
            <div className="mt-5">
                <h3>Latest Website Activity</h3>
                <div className="row gx-5 gy-4">
                    <div className="col-sm-12 col-md" style={{"min-width":"0"}}>
                        <div className="p-3 border border-1 bg-light">
                            <h5 className="mt-2">Latest Comments</h5>
                            {
                                comments && comments.map(c =>
                                    <LatestCommentComponent comment={c} />
                                )
                            }
                        </div>
                    </div>
                    <div className="col-sm-12 col-md">
                        <div className="p-3 border border-1 bg-light">
                            <h5 className="mt-2">Latest Bookmarks</h5>
                            {
                                bookmarks && bookmarks.map(b =>
                                    <LatestBookmarkComponent bookmark={b} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-4"></div>
        </div>
    );
}

export default HomeComponent;