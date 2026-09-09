import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export const Recentpost = () => {

    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getBlogs = async (pageNo = 1) => {
        try {

            const res = await get("/blog", { page: pageNo });

            setBlogs(res.data.blogs);
            setPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBlogs(page);
    }, [page]);

    return (
        <>
            <div className="container">

                <div className="mb-5 text-center">
                    <h2 className="fw-bold text-white">Recent Posts</h2>
                </div>

                <div className="row">

                    {blogs.map((blog) => (

                        <div
                            className="col-md-4 col-lg-4 mb-4"
                            key={blog._id}
                        >

                            <div
                                className="card border-success h-100"
                                style={{
                                    borderWidth: "2px",
                                    backgroundColor: "#2b2b2b",
                                    borderRadius: "10px",
                                    overflow: "hidden"
                                }}
                            >

                                <img
                                    src={`${BaseUrl}${blog.image}`}
                                    className="card-img-top"
                                    alt={blog.title}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body bg-dark text-white">

                                    <h5>{blog.title}</h5>

                                    <p>{blog.desc}</p>

                                    <button
                                        className="btn btn-primary w-100 mt-3"
                                        onClick={() =>
                                            navigate(`/post/${blog._id}`)
                                        }
                                    >
                                        Read Article
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Pagination */}

                <div className="d-flex justify-content-center my-4">

                    <button
                        className="btn btn-outline-light me-2"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span
                        className="text-white align-self-center mx-3"
                    >
                        Page {page} of {totalPages}
                    </span>

                    <button
                        className="btn btn-outline-light"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>
        </>
    );
};
