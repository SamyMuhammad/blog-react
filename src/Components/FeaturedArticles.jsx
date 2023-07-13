import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ApiConfig from "./../Services/ApiConfig";

function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFeaturedArticles();
  }, []);

  const getFeaturedArticles = () => {
    ApiConfig.getFeaturedArticles
      .then(function (response) {
        setArticles(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <div id="featured-articles" className="mt-10 px-10 md:px-15 lg:px-32">
      <h3 className="text-xl font-bold mt-5 mb-3">
        Discover some of our best articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => {
          return (<ArticleCard key={index} article={article} />);
        })}
      </div>
      <div className="ml-4 mt-5 text-center">
        <button
          className="bg-indigo-700 bg-opacity-95 text-white rounded shadow-sm shadow-indigo-300 hover:shadow-xl px-4 py-2"
          onClick={() => navigate("article")}
        >
          Show all articles
        </button>
      </div>
    </div>
  );
}

export default FeaturedArticles;
