import axios from 'axios';

const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const COMMENTS_API = `${SERVER_API_URL}/comments`;
export const createComment = async (comment) => {
    const response = await axios.post(COMMENTS_API, comment);
    return response.data;
}
export const findCommentByAuthor = async (username) => {
    const response = await axios.get(`${COMMENTS_API}/author/${username}`);
    return response.data;
}
export const findCommentByTopic = async (tid) => {
    const response = await axios.get(`${COMMENTS_API}/topic/${tid}`);
    return response.data;
}
export const findRecentComments = async () => {
    const response = await axios.get(`${COMMENTS_API}/recent`);
    return response.data;
}
export const updateComment = async (comment) => {
    const response = await axios.put(`${COMMENTS_API}/${comment._id}`, comment);
    return response.data;
}
export const deleteComment = async (cid) => {
    const response = await axios.delete(`${COMMENTS_API}/${cid}`);
    return response.data;
}
