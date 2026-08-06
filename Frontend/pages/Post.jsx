import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Post = () => {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const getSingleBlog = async () => {
    try {

      const res = await axios.get(
        `http://localhost:8000/blog/${id}`
      );

      console.log(res.data);

      setBlog(res.data.blog);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="container text-center mt-5">
        <h3 className="text-white">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container text-white mt-5">

      <div className="row">

        <div className="col-md-12">

          <h1 className="fw-bold mb-4 display-4">
            {blog.title}
          </h1>

          <img
            src={`http://localhost:8000${blog.image}`}
            alt={blog.title}
            className="img-fluid mb-4"
            style={{
              borderRadius: "10px",
              maxHeight: "500px",
              objectFit: "cover",
              width: "100%"
            }}
          />

          <p className="fs-5">
            {blog.desc}
          </p>

          <p className="text-secondary">
            Posted on{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          <hr />

          <h3 className="mt-5 mb-4">
            Leave a Comment
          </h3>

          <form>

            <div className="mb-3">

              <label
                htmlFor="comment"
                className="form-label"
              >
                Comment
              </label>

              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your comment here..."
              ></textarea>

            </div>

            <button
              className="btn btn-primary"
            >
              Submit Comment
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};