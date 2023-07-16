import axios from "axios";

const BASE_URL = "https://blog-backend.test/api";

// axios config
axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');

// auth APIs
const register = (userData) =>
  axios.post(BASE_URL + "/register", userData);

const login = (userData) =>
  axios.post(BASE_URL + "/login", userData);

const logout = () => axios.post(BASE_URL + "/logout");
// end auth APIs

// start articles APIs
const getFeaturedArticles = axios.get(BASE_URL + "/article", {
  params: {
    featured: 1,
  },
});

const getArticlesList = (pageNum = 1) =>
  axios.get(BASE_URL + "/article", {
    params: {
      page: pageNum,
    },
  });

const getSingleArticle = (slug) => axios.get(BASE_URL + "/article/" + slug, {});
// end articles APIs

export default {
  getFeaturedArticles,
  getArticlesList,
  getSingleArticle,
  login,
  logout,
  register
};
