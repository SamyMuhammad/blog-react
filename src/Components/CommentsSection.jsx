import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ApiConfig from "../Services/ApiConfig";

function CommentsSection({ slug, comments }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState(comments);

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  const postComment = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      return toast.error("You need to be logged in to post a comment.");
    }

    if (newComment.trim().length === 0) {
      toast.error("You need to fill the input first.");
      return;
    }

    const data = {
      body: newComment,
    };

    ApiConfig.storeComment(slug, data)
      .then(function (response) {
        setNewComment("");
        setCommentsList(response.data.data);
        toast.success("Your comment has been added successfully!");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const deleteComment = (commentId) => {
    ApiConfig.deleteComment(commentId)
      .then(function (response) {
        setCommentsList((prev) => prev.filter(comment => comment.id !== commentId));
        toast.success("Your comment has been deleted successfully!");
      })
      .catch(function (error) {
        toast.error(error.message);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900 mt-16">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({commentsList?.length})
          </h2>
        </div>
        <form className="mb-6" action="#" onSubmit={postComment}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="px-0 resize-none w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`${
              !isLoggedIn ? "cursor-not-allowed" : ""
            } inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-500 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800`}
            disabled={!isLoggedIn}
          >
            Post comment
          </button>
        </form>
        {commentsList?.map((comment) => (
          <article key={comment.id} className="p-6 mb-6 text-base bg-white">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={comment.user.avatar}
                    alt={comment.user.name}
                  />
                  {comment.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime="2022-03-12" title="March 12th, 2022">
                    {comment.created_at}
                  </time>
                </p>
              </div>
              {isLoggedIn && comment.auth_is_owner ? (
                <div className="flex justify-center">
                  {/* Edit button */}
                  <button
                    className="p-2 text-sm font-medium text-center text-yellow-500 bg-white rounded-lg hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="p-2 text-sm font-medium text-center text-red-500 bg-white rounded-lg hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
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
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

CommentsSection.propTypes = {
  slug: PropTypes.string,
  comments: PropTypes.array,
};

export default CommentsSection;
