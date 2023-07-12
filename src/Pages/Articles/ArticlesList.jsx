import ArticleCard from './../../Components/ArticleCard';

function ArticlesList() {
  return (
    <div id="featured-posts" className="mt-10 px-10 md:px-15 lg:px-32">
      {/* <h3 className="text-xl font-bold mt-5 mb-3">
        Discover some of our best articles
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  )
}

export default ArticlesList