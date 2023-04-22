import {useParams} from "react-router";
import {useState, useEffect} from "react";
import {getRecipeInfo} from "../../services/recipes-service";
import AddComment from "../comments/add-comment";
import {useSelector, useDispatch} from "react-redux";
import CommentComponent from "../comments";
import {createBookmarkThunk, deleteBookmarkThunk, findBookmarksByTopicThunk} from "../../services/bookmarks-thunk";
import {Link} from "react-router-dom";
import parse from "html-react-parser";
import "./index.css"

const DetailComponent = () => {
    const {rid} = useParams();
    const [recipe, setRecipe] = useState({});
    const {bookmarks} = useSelector(state => state.bookmarks);
    const {comments} = useSelector(state => state.comments);
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const fetchInfo = async () => {
        const response = await getRecipeInfo(rid);
        setRecipe(response);
    }
    const fetchBookmark = async () => {
        dispatch(findBookmarksByTopicThunk(rid));
    }
    const createBookmark = async () => {
        dispatch(createBookmarkThunk({topicID: rid, topicTitle:recipe.title, userID: currentUser._id, user: currentUser.username}));
    }
    const removeBookmark = async () => {
        const bid = bookmarks.find(b => b.topicID == rid)._id;
        dispatch(deleteBookmarkThunk(bid));
    }

    useEffect(() => {
        fetchInfo();
        fetchBookmark();
    }, []);

    return (
        <div className="container-md mt-5 mb-4">
            <h2 className="mb-2">{recipe.title}</h2>
            <div className="d-flex">
                <img className="me-5 recipe-image border border-2 rounded-3" src={recipe.image} />
                <div className="ms-5 card border-info">
                    <div className="card-header bg-info text-light fw-bold">Recipe Breakdown</div>
                    <div className="card-body ps-5 pe-5 ">
                        <div className="card-text">
                            <span className="fw-bold">Cooking Time:</span> {recipe.readyInMinutes} minutes <br/>
                            <span className="fw-bold">Servings:</span> {recipe.servings}<br/>
                            <span className="fw-bold">Dairy Free:</span> {recipe.dairyFree? 'Yes' : 'No'}<br/>
                            <span className="fw-bold">Gluten Free:</span> {recipe.glutenFree? 'Yes' : 'No'}<br/>
                            <span className="fw-bold">Ketogenic:</span> {recipe.ketogenic? 'Yes' : 'No'}<br/>
                            <span className="fw-bold">Vegetarian:</span> {recipe.vegetarian? 'Yes' : 'No'}<br/>
                            <span className="fw-bold">Vegan:</span> {recipe.vegan? 'Yes' : 'No'}<br/>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="mt-4">Ingredients</h3>
            <div className="list-group">
                {recipe.extendedIngredients && recipe.extendedIngredients.map(i =>
                    <ul>
                        <i className="bi bi-dot text-dark"></i>
                        {i.original}
                        <> </>
                        <Link to={`/detail/${rid}/${i.id}`}>
                            <i className="bi bi-question-circle text-info"></i>
                        </Link>
                    </ul>)}
            </div>
            <h3 className="mt-2">Instructions</h3>
            <div>{parse(`${recipe.instructions}`)}</div>
            <div className="mt-3 mb-3 d-flex">
                <div className="me-4">
                    <i className="bi bi-chat-dots"> </i>
                    {comments.length} {comments.length == 1? 'comment' : 'comments'}
                </div>
                {currentUser == undefined?
                    <>
                        <i className="bi bi-bookmark text-danger" style={{"cursor":"pointer"}} onClick={() => {
                            alert("You must sign in to bookmark this recipe.");
                        }}></i>
                    </>
                    :
                    <>
                        <i className={`bi ${bookmarks.find(b => b.user == currentUser.username) == undefined?
                            'bi-bookmark' : 'bi-bookmark-fill'} text-danger`}
                           style={{"cursor":"pointer"}}
                           onClick={() => {
                               bookmarks.find(b => b.user == currentUser.username) == undefined?
                                   createBookmark() : removeBookmark()
                           }}></i>
                    </>}<> </>{bookmarks.length} {bookmarks.length == 1? 'bookmark' : 'bookmarks'}
            </div>
            <h2 className="mt-4">Comments</h2>
            {currentUser != undefined
                && <AddComment user={currentUser.username} topicID={rid} topicTitle={recipe.title}/>}
            <CommentComponent topicID={rid}/>
        </div>
    );
}

export default DetailComponent;