import React from "react";

function HeroSection() {
  return (
    <div className='font-mono bg-[url("/public/hero.jpg")] h-[99vh] w-full bg-cover bg-center p-20'>
      <div className="flex flex-col items-center justify-center">
        <h1 className="px-6 py-2 mb-2 text-4xl font-bold text-center text-white bg-indigo-700 bg-opacity-80 rounded-md shadow-md mt-20">
          Learn, discover and get inspired with our blog 
        </h1>
        <div className="mt-20">
          <a href="#featured-posts" className="px-6 py-2 font-bold text-center text-white bg-indigo-700 bg-opacity-80 rounded-md shadow-md">
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
