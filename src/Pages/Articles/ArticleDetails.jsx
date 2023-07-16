import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import CommentsSection from "../../Components/CommentsSection";
import ApiConfig from "../../Services/ApiConfig";

function ArticleDetails() {
  const {slug} = useParams();
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

  return (
    <div className="px-6 md:px-20 lg:px-56 mt-10">
      <h2 className="text-[23px] font-bold">{article.title}</h2>
      <div className="flex items-center mt-5">
        <img
          src={articleUser.avatar}
          className="w-[35px] rounded-full"
        />
        <div className="ml-2">
          <h4 className="font-bold text-[12px]">{articleUser.name}</h4>
          <div className="text-gray-500 text-[10px]">{article.created_at}</div>
        </div>
      </div>
      <img src={article.cover} className="rounded-2xl mt-5 mb-5 w-full h-72" />
      <article className="leading-9">{article.body ? parse(article.body) : ""}</article>
      <CommentsSection />
    </div>
  );
}

export default ArticleDetails;
