import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ArticleCard({article}) {
  const navigate = useNavigate();

  return (
    <div key={article.id}
    onClick={() => navigate('/article/'+article.slug)}
    className="article-card m-4 mb-16 cursor-pointer">
      <img
        src={article.cover}
        className="w-full rounded-2xl
             object-cover h-[200px]"
      />
      <h2 className="font-bold mt-3">{article.title}</h2>
      <p className="line-clamp-3 text-gray-400 mt-3">{article.body}</p>
      <div className="flex items-center mt-5">
        <img
          src="https://courses.tubeguruji.com/static/media/logo.8f2db318fe31ffaf5793.png"
          className="w-[35px] rounded-full"
        />
        <div className="ml-2">
          <h4 className="font-bold text-[12px]">{article.user.name}</h4>
          <div className="text-gray-500 text-[10px]">{article.created_at}</div>
        </div>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.object
};

export default ArticleCard;
