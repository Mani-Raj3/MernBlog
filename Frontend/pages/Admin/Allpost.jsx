import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const Allpost = () => {

  const posts = [
    {
      title: "My First Blog",
      desc: "This is my first Blog",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
    },
    {
      title: "Learning React",
      desc: "Learn React from beginner to advanced.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
    },
    {
      title: "JavaScript Basics",
      desc: "Understand the basics of JavaScript.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
    },
    {
      title: "Node.js Tutorial",
      desc: "Build powerful backend applications with Node.js.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800"
    },
    {
      title: "Web Development",
      desc: "Explore modern web development technologies.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800"
    },
    {
      title: "Programming",
      desc: "Improve your programming and problem-solving skills.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800"
    }

  ];

  return (
    <div className="container mt-5">
      <h2 className="text-white mb-4">All Posts</h2>

      <div className="row">
        {posts.map((post, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">

              <img
                src={post.image}
                alt={post.title}
                className="card-img-top"
                style={{
                  height: "320px",
                  objectFit: "cover"
                }}
              />

              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.desc}</p>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-danger">
                  <FaTrashAlt /> Delete
                </button>

                <button className="btn btn-warning">
                  <FaEdit /> Update
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};