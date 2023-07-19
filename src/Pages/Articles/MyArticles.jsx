import { useEffect, useState, useContext } from "react";
import ArticleCard from "./../../Components/ArticleCard";
import PaginationNavigation from "../../Components/PaginationNavigation";
import ApiConfig from "./../../Services/ApiConfig";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/authContext";

function MyArticles() {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({});
  const [paginationLinks, setPaginationLinks] = useState({});
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ?? 1);

  useEffect(() => {
    if (!authData.signedIn) {
      navigate("/");
    }

    getMyArticles(currentPage);
  }, [currentPage]);

  const getMyArticles = (page) => {
    setSearchParams({ page: page });
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => (btn.disabled = true));

    ApiConfig.getMyArticles(page)
      .then(function (response) {
        setArticles(response.data.data);
        setPaginationMeta(response.data.meta);
        setPaginationLinks(response.data.links);
        setCurrentPage(response.data.meta.current_page);
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      })
      .finally(function () {
        setTimeout(() => {
          buttons.forEach((btn) => (btn.disabled = false));
        }, 1500);
      });
  };

  return (
    <div id="all-articles" className="mt-10 px-10 md:px-15 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => {
          return (
            <ArticleCard
              key={index}
              article={article}
              dataSource={getMyArticles}
              currentPage={currentPage}
            />
          );
        })}
      </div>

      {/* The pagination navigation */}
      <PaginationNavigation
        paginationLinks={paginationLinks}
        paginationMeta={paginationMeta}
        setCurrentPage={setCurrentPage}
      />
      {/* End pagination navigation */}
    </div>
  );
}

export default MyArticles;
