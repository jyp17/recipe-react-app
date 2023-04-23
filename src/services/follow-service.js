import axios from "axios";

const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const FOLLOWS_API = `${SERVER_API_URL}/follows`;

export const createFollow = async (follower, followed) => {
    const response = await axios.post(
        `${FOLLOWS_API}/${follower}/follows/${followed}`);
    return response.data;
}

export const deleteFollow = async (follower, followed) => {
    const response = await axios.delete(
        `${FOLLOWS_API}/${follower}/follows/${followed}`);
    return response.data;
}

export const findAllFollows = async () => {
    const response = await axios.get(FOLLOWS_API);
    return response.data;
}

export const findFollow = async (follower, followed) => {
    const response = await axios.get(
        `${FOLLOWS_API}/${follower}/follows/${followed}`);
    return response.data;
}

export const findByFollowers = async (follower) => {
    const response = await axios.get(`${FOLLOWS_API}/follower/${follower}`);
    return response.data;
}

export const findByFollowed = async (followed) => {
    const response = await axios.get(`${FOLLOWS_API}/followed/${followed}`);
    return response.data;
}