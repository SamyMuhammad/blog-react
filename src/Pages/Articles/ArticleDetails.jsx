import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import CommentsSection from "../../Components/CommentsSection";
import ApiConfig from "../../Services/ApiConfig";

function ArticleDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [articleUser, setArticleUser] = useState({});

  useEffect(() => {
    getSingleArticle(slug);
  }, [slug]);

  const getSingleArticle = (slug) => {
    ApiConfig.getSingleArticle(slug)
      .then(function (response) {
        setArticle(response.data.data);
        setArticleUser(response.data.data.user);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const deleteArticle = (slug) => {
    if (confirm("Are you sure you want to delete this article?")) {
      ApiConfig.deleteArticle(slug)
        .then(function (response) {
          toast.success("The article has been deleted successfully!");
          navigate("/my-articles");
        })
        .catch(function (error) {
          switch (error.response.status) {
            case 404:
              toast.error("Article is not found.");
              break;

            case 403:
              toast.error("This action is unauthorized.");
              break;

            default:
              toast.error(error.message);
              break;
          }
        })
        .finally(function () {});
    }
  };

  return (
    <div className="px-6 md:px-20 lg:px-56 mt-10">
      {article.auth_is_owner ? (
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/article/" + article.slug + "/edit")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-5 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button type="button" onClick={() => deleteArticle(article.slug)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
      <h2 className="text-[23px] font-bold">{article.title}</h2>
      <div className="flex items-center mt-5">
        <img src={articleUser.avatar} className="w-[35px] rounded-full" />
        <div className="ml-2">
          <h4 className="font-bold text-[12px]">{articleUser.name}</h4>
          <div className="text-gray-500 text-[10px]">{article.created_at}</div>
        </div>
      </div>
      <img src={article.cover} className="rounded-2xl mt-5 mb-5 w-full h-72" />
      <article className="leading-9">
        {article.body ? parse(article.body) : ""}
      </article>
      <CommentsSection slug={slug} comments={article.comments} />
    </div>
  );
}

export default ArticleDetails;
