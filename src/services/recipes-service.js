import axios from 'axios';
const API_KEY = process.env.RECIPE_API_KEY;
const API_BASE = process.env.RECIPE_API_BASE;
const RECIPE_API = `${API_BASE}/recipes/`;

export const findRecipes = async (criteria) => {
    const response = await axios.get(RECIPE_API + `complexSearch?apiKey=${API_KEY}&query=${criteria}`);
    const recipes = response.data;
    return recipes;
};

export const findByIngredients = async (criteria) => {
    // parse array of ingredients first
    const response = await axios.get(RECIPE_API + `findByIngredients`);
    const recipes = response.data;
};

export const findIngredient = async (iid) => {
    const response = await axios.get(API_BASE + `/food/ingredients/${iid}/information?apiKey=${API_KEY}&amount=1`)
    const ingredient = response.data;
    return ingredient;
}

export const getRecipeInfo = async (rid) => {
    const response = await axios.get(RECIPE_API + rid + `/information?apiKey=${API_KEY}`)
    const recipe = response.data;
    return recipe;
}