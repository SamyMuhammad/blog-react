import axios from "axios";

const BASE_URL = "https://blog-backend.test/api";

const getFeaturedArticles = axios.get(BASE_URL + "/article", {
  params: {
    featured: 1,
  },
});
export default { getFeaturedArticles };
