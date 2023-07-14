import axios from "axios";

const BASE_URL = "https://blog-backend.test/api";

const login = (userData) => axios.post(BASE_URL + "/login", userData, {
  headers: {
    'Accept': 'application/json'
  }
});

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

const getSingleArticle = (slug) =>
  axios.get(BASE_URL + "/article/" + slug, {
  });
export default { getFeaturedArticles, getArticlesList, getSingleArticle, login };
