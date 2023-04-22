import {findIngredient} from "../../services/recipes-service";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
const IngredientDetail = () => {
    const {rid, iid} = useParams();
    const [ingredient, setIngredient] = useState();
    const navigate = useNavigate();
    const getInfo = async () => {
        const ing = await findIngredient(iid);
        setIngredient(ing);
    };

    const capitalize = (str) => {
        const title = str.substring(0,1).toUpperCase() + str.substring(1);
        return title;
    }

    useEffect(() => {
        getInfo();
    }, []);

    return(
        <div className="container-md mt-5 mb-4">
            <i className="bi bi-arrow-left" onClick={() => navigate(`/detail/${rid}`)}> Back to Recipe</i>
            <h1 className="mt-2">Ingredient Info</h1>
            <div className="m-4"></div>
            {ingredient != undefined &&
                <div>
                    <div className="row">
                        <div className="col-4 m-3">
                            <img className="border border-2 rounded-3 p-2" src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`} />
                        </div>
                        <div className="col m-3 align-self-center">
                            <h2 className="fw-bold">{capitalize(ingredient.name)}</h2>
                            <h4><span className="fw-bold">Supermarket Aisle: </span><span className="text-black">{ingredient.aisle}</span></h4>
                            <h4><span className="fw-bold">Estimated Cost: </span><span className="text-black">${ingredient.estimatedCost.value}</span></h4>
                        </div>
                    </div>
                    <div className="m-4"></div>
                    <h4>Nutritional Value:</h4>
                    <ul className="list-group">
                        <li className="list-group-item fw-bold text-black">
                            <div className="row">
                                <div className="col">
                                    Nutrient
                                </div>
                                <div className="col">
                                    % of Daily Needs
                                </div>
                            </div>
                        </li>
                         {ingredient.nutrition.nutrients.map((n) => {
                            return(
                            <li className="list-group-item text-black">
                                <div className="row">
                                    <div className="col">
                                        {n.name} ({n.amount} {n.unit})
                                    </div>
                                    <div className="col">
                                        {n.percentOfDailyNeeds}%
                                    </div>
                                </div>
                            </li>)
                        })}
                    </ul>
                </div>
            }
        </div>
    );
}

export default IngredientDetail;