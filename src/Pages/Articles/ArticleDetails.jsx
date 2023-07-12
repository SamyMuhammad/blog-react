import React from "react";
import CommentsSection from "../../Components/CommentsSection";

function ArticleDetails() {
  return (
    <div className="px-6 md:px-20 lg:px-56 mt-10">
      <h2 className="text-[23px] font-bold">Lorem ipsum dolor sit.</h2>
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
      <img src="https://courses.tubeguruji.com/static/media/logo.8f2db318fe31ffaf5793.png" className="rounded-2xl mt-5 mb-5 w-full h-72" />
      <article className="leading-9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit incidunt officiis minima pariatur fuga vero totam obcaecati nesciunt nulla laborum ea cum hic quaerat provident quidem nam, labore beatae quia consequuntur harum tempore tenetur soluta quam? Vero, voluptas nobis dolores natus tempora officia deserunt laborum temporibus culpa vitae id laboriosam sed dicta voluptatum, alias provident obcaecati et incidunt qui rerum possimus. Sint, fugiat quia impedit possimus repellendus consequuntur voluptatibus, quasi nobis labore, veniam quibusdam harum corrupti adipisci doloremque ipsam nostrum ea odit nemo sapiente culpa molestiae. Tenetur, earum ab. Vel molestiae error unde ullam sed illum rerum dolor dolores nostrum?</article>
      <CommentsSection />
    </div>
  );
}

export default ArticleDetails;
