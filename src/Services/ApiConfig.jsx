import axios from "axios";

const BASE_URL = "https://blog-backend.test/api";

const getFeaturedArticles = axios.get(BASE_URL + "/article", {
  params: {
    featured: 1,
  },
});

const getArticlesList = (pageNum = 1) => axios.get(BASE_URL + "/article", {
  params: {
    page: pageNum,
  },
});
export default { getFeaturedArticles, getArticlesList };
