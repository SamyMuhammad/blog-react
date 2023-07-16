import { useState, useEffect } from "react";
import ApiConfig from "../../Services/ApiConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleData = {
      title: title,
      cover: cover,
      body: body,
    };

    console.log(articleData);

    ApiConfig.storeArticle(articleData)
      .then(function (response) {
        navigate("/article/"+response.data.slug);
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          console.log(error);
        }
      })
      .finally(function () {});
  };

  return (
    <div className="w-full px-16 py-10">
      <form action="#" onSubmit={handleSubmit} className="m-auto w-2/3">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Add a new article
            </h2>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    autoComplete="title"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus-visible:outline-none"
                    placeholder="My new article"
                  />
                  {errors?.title
                    ? errors.title.map((errorMessage, index) => (
                        <div key={index} className="text-sm text-red-600 mt-1">
                          {errorMessage}
                        </div>
                      ))
                    : ""}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="cover"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload a cover image
                </label>
                <div className="mt-2">
                  <input
                    id="cover"
                    name="cover"
                    type="file"
                    onChange={({ target }) => setCover(target.files[0])}
                    autoComplete="cover"
                    accept="image/*"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
                  />
                  {errors?.cover
                    ? errors.cover.map((errorMessage, index) => (
                        <div key={index} className="text-sm text-red-600 mt-1">
                          {errorMessage}
                        </div>
                      ))
                    : ""}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Article Body
                </label>
                <div className="mt-2">
                    <ReactQuill theme="snow" value={body} onChange={setBody} className="h-44" placeholder="What is in your mind?"/>
                  {errors?.body
                      ? errors.body.map((errorMessage, index) => (
                          <div key={index} className="text-sm text-red-600 mt-12">
                            {errorMessage}
                          </div>
                        ))
                      : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;
