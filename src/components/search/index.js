import {useState, useEffect} from "react";
import {useParams} from "react-router";
import SearchBarComponent from "./search-bar";
import {findRecipes} from "../../services/recipes-service";
import {Link} from "react-router-dom";
const ResultComponent = () => {
    const {criteria} = useParams();
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const response = await findRecipes(criteria);
        setRecipes(response);
    }

    useEffect(() => {
        if (criteria != undefined) {
            fetchRecipes();
        }
    }, [criteria]);

    return(
        <div className="container-md mt-5">
            <h2>Search Results</h2>
            <SearchBarComponent />
            <div>
                {(criteria == undefined || recipes.totalResults == 0)?
                    <h4 className="ms-1 mt-4">No Results</h4> :
                    <h4 className="ms-1 mt-4 mb-3">Showing results for '{criteria}'</h4>
                }
                <div className="list-group mb-4">
                    {recipes.length != 0 && recipes.results.map(res => {
                        return <Link id={`${res.id}`} to={`/detail/${res.id}`} className="list-group-item">{res.title}</Link>
                    })}
                </div>
            </div>
        </div>
    );
}
export default ResultComponent;