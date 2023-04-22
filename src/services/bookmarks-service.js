import axios from 'axios';

const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const BOOKMARKS_API = `${SERVER_API_URL}/bookmarks`;
export const createBookmark = async (bkmk) => {
    const response = await axios.post(BOOKMARKS_API, bkmk);
    return response.data;
}
export const findBookmarksByUser = async (username) => {
    const response = await axios.get(`${BOOKMARKS_API}/user/${username}`);
    return response.data;
}
export const findBookmarksByTopic = async (tid) => {
    const response = await axios.get(`${BOOKMARKS_API}/topic/${tid}`);
    return response.data;
}
export const findRecentBookmarks = async () => {
    const response = await axios.get(`${BOOKMARKS_API}/recent`);
    return response.data
}
export const deleteBookmark = async (bid) => {
    const response = await axios.delete(`${BOOKMARKS_API}/${bid}`);
    return response.data;
}
