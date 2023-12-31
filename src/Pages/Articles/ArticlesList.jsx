import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./../../Components/ArticleCard";
import ApiConfig from "./../../Services/ApiConfig";
import { toast } from "react-toastify";
import PaginationNavigation from "../../Components/PaginationNavigation";

function ArticlesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({});
  const [paginationLinks, setPaginationLinks] = useState({});
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ?? 1);

  useEffect(() => {
    getArticlesList(currentPage);
  }, [currentPage]);

  const getArticlesList = (page) => {
    setSearchParams({ page: page });
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => (btn.disabled = true));

    ApiConfig.getArticlesList(page)
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
    <>
      {articles.length ? (
        <div id="all-articles" className="mt-10 px-10 md:px-15 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => {
              return <ArticleCard key={index} article={article} />;
            })}
          </div>

          <PaginationNavigation
            paginationLinks={paginationLinks}
            paginationMeta={paginationMeta}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div className="h-[80vh] pt-28">
          <h4 className="w-full text-xl text-center font-semibold">
            No Data to be displayed
          </h4>
        </div>
      )}
    </>
  );
}

export default ArticlesList;
