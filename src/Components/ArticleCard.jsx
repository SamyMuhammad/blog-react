import React from "react";

function ArticleCard() {
  return (
    <div className="article-card m-4 mb-16 cursor-pointer">
      <img
        src="https://courses.tubeguruji.com/static/media/logo.8f2db318fe31ffaf5793.png"
        className="w-full rounded-2xl
             object-cover h-[200px]"
      />
      <h2 className="font-bold mt-3">Lorem ipsum dolor sit.</h2>
      <p className="line-clamp-3 text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, id
        quas. Assumenda error ipsum fugit iste quod maiores vel distinctio,
        cumque deleniti optio sunt vero vitae libero facere ipsam? Eveniet.
      </p>
      <div className="flex items-center mt-5">
        <img
          src="https://courses.tubeguruji.com/static/media/logo.8f2db318fe31ffaf5793.png"
          className="w-[35px] rounded-full"
        />
        <div className="ml-2">
          <h4 className="font-bold text-[12px]">Tubeguruji</h4>
          <div className="text-gray-500 text-[10px]">24 Sept 2024</div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
