import axios from "axios";

const BASE_URL = "https://blog-backend.test/api";

// axios config
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

// auth APIs
const register = (userData) => axios.post(BASE_URL + "/register", userData);

const login = (userData) => axios.post(BASE_URL + "/login", userData);

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

const getMyArticles = (pageNum = 1) =>
  axios.get(BASE_URL + "/my-articles", {
    params: {
      page: pageNum,
    },
  });

const getSingleArticle = (slug) => axios.get(BASE_URL + "/article/" + slug, {});

const storeArticle = (articleData) =>
  axios.post(BASE_URL + "/article", articleData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const updateArticle = function (slug, articleData) {
  articleData._method = "PATCH";
  return axios.post(BASE_URL + "/article/" + slug, articleData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteArticle = (slug) => axios.delete(BASE_URL + "/article/" + slug);
// end articles APIs

// Start comments APIs
const storeComment = (articleSlug, commentData) =>
  axios.post(BASE_URL + "/article/" + articleSlug + "/comment", commentData);

const deleteComment = (commentId) =>
  axios.delete(BASE_URL + "/comment/" + commentId);

// End comments APIs

export default {
  getFeaturedArticles,
  getArticlesList,
  getMyArticles,
  getSingleArticle,
  login,
  logout,
  register,
  storeArticle,
  updateArticle,
  deleteArticle,
  storeComment,
  deleteComment,
};
