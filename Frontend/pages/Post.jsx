import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { BaseUrl, get } from "../src/services/Endpoint";
import axios from "axios";

export const Post = () => {

  // ==========================================
  // GET BLOG ID FROM URL
  // ==========================================

  const { id } = useParams();


  // ==========================================
  // BLOG STATE
  // ==========================================

  const [blog, setBlog] = useState(null);


  // ==========================================
  // NORMAL COMMENT FORM
  // ==========================================

  // Text typed inside Leave a Comment textarea
  const [comment, setComment] = useState("");


  // ==========================================
  // COMMENTS LIST
  // ==========================================

  // Comments received from backend
  const [comments, setComments] = useState([]);

  // Current comments page
  const [commentPage, setCommentPage] = useState(1);

  // Total comment pages
  const [totalPages, setTotalPages] = useState(1);

  // Comments loading
  const [loadingComments, setLoadingComments] = useState(false);


  // ==========================================
  // SUBMIT COMMENT LOADING
  // ==========================================

  const [submitting, setSubmitting] = useState(false);


  // ==========================================
  // REPLY STATE
  // ==========================================

  // Reply textarea value
  const [replyText, setReplyText] = useState("");

  // Which comment is currently being replied to
  const [replyingTo, setReplyingTo] = useState(null);

  // Reply submitting/loading
  const [replySubmitting, setReplySubmitting] = useState(false);


  // ==========================================
  // GET SINGLE BLOG
  // ==========================================

  const getSingleBlog = async () => {

    try {

      const res = await get(`/blog/${id}`);

      console.log("Single blog:", res.data);

      setBlog(res.data.blog);

    } catch (error) {

      console.log(
        "Error fetching blog:",
        error.response?.data || error.message
      );

    }

  };


  // ==========================================
  // GET COMMENTS
  // ==========================================

  const getComments = async (page = 1) => {

    try {

      setLoadingComments(true);

      console.log(
        "Getting comments for post:",
        id,
        "Page:",
        page
      );


      const res = await get(
        `/blog/comments/${id}?page=${page}&limit=5`
      );


      console.log(
        "Comments response:",
        res.data
      );


      const fetchedComments =
        res.data.comments || [];


      // ==========================================
      // FIRST PAGE
      // ==========================================

      if (page === 1) {

        setComments(fetchedComments);

      }


      // ==========================================
      // NEXT PAGE
      // ==========================================

      else {

        setComments((previousComments) => [

          ...previousComments,

          ...fetchedComments

        ]);

      }


      // ==========================================
      // PAGINATION
      // ==========================================

      setCommentPage(
        res.data.currentPage || page
      );

      setTotalPages(
        res.data.totalPages || 1
      );


    } catch (error) {

      console.log(
        "Error fetching comments:",
        error.response?.data || error.message
      );

    } finally {

      setLoadingComments(false);

    }

  };


  // ==========================================
  // SUBMIT NORMAL COMMENT
  // ==========================================

  const handleSubmitComment = async (e) => {

    e.preventDefault();


    // ==========================================
    // VALIDATE COMMENT
    // ==========================================

    if (!comment.trim()) {

      alert("Please write a comment");

      return;

    }


    // ==========================================
    // GET TOKEN
    // ==========================================

    const token =
      localStorage.getItem("token");


    if (!token) {

      alert("Please login first");

      return;

    }


    try {

      setSubmitting(true);


      // ==========================================
      // CREATE COMMENT
      // ==========================================

      const res = await axios.post(

        `${BaseUrl}/blog/comments/create/${id}`,

        {
          comment: comment.trim()
        },

        {
          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json"

          }

        }

      );


      console.log(
        "Comment response:",
        res.data
      );


      // ==========================================
      // CLEAR COMMENT BOX
      // ==========================================

      setComment("");


      alert(
        "Comment submitted successfully!"
      );


      // ==========================================
      // REFRESH COMMENTS
      // ==========================================

      await getComments(1);


    } catch (error) {

      console.log(
        "Comment error:",
        error.response?.data ||
        error.message
      );


      alert(
        error.response?.data?.message ||
        "Failed to submit comment"
      );

    } finally {

      setSubmitting(false);

    }

  };


  // ==========================================
  // SUBMIT REPLY
  // ==========================================

  const handleReply = async (commentId) => {

    // ==========================================
    // VALIDATE REPLY
    // ==========================================

    if (!replyText.trim()) {

      alert("Please write a reply");

      return;

    }


    // ==========================================
    // GET TOKEN
    // ==========================================

    const token =
      localStorage.getItem("token");


    if (!token) {

      alert("Please login first");

      return;

    }


    try {

      setReplySubmitting(true);


      // ==========================================
      // CREATE REPLY
      // ==========================================

      const res = await axios.post(

        `${BaseUrl}/blog/comment/reply/${commentId}`,

        {
          comment: replyText.trim()
        },

        {
          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json"

          }

        }

      );


      console.log(
        "Reply response:",
        res.data
      );


      // ==========================================
      // GET NEW REPLY FROM RESPONSE
      // ==========================================

      const newReply =
        res.data.reply;


      // ==========================================
      // ADD NEW REPLY AT TOP
      // OF CORRECT COMMENT
      // ==========================================

      if (newReply) {

        setComments((previousComments) => {

          return previousComments.map(
            (item) => {

              // Find parent comment
              if (item._id === commentId) {

                return {

                  ...item,

                  replies: [

                    newReply,

                    ...(item.replies || [])

                  ]

                };

              }


              // Other comments stay unchanged
              return item;

            }
          );

        });

      }


      // ==========================================
      // CLEAR REPLY FORM
      // ==========================================

      setReplyText("");

      setReplyingTo(null);


      alert(
        "Reply added successfully!"
      );


    } catch (error) {

      console.log(
        "Reply error:",
        error.response?.data ||
        error.message
      );


      alert(
        error.response?.data?.message ||
        "Failed to add reply"
      );

    } finally {

      setReplySubmitting(false);

    }

  };


  // ==========================================
  // GET BLOG + COMMENTS
  // ==========================================

  useEffect(() => {

    getSingleBlog();

    getComments(1);

  }, [id]);


  // ==========================================
  // BLOG LOADING
  // ==========================================

  if (!blog) {

    return (

      <div className="container text-center mt-5">

        <h3 className="text-white">

          Loading...

        </h3>

      </div>

    );

  }


  // ==========================================
  // PAGE UI
  // ==========================================

  return (

    <div className="container text-white mt-5">

      <div className="row">

        <div className="col-md-12">


          {/* ==========================================
              BLOG TITLE
          ========================================== */}

          <h1 className="fw-bold mb-4 display-4">

            {blog.title}

          </h1>


          {/* ==========================================
              BLOG IMAGE
          ========================================== */}

          <img

            src={`${BaseUrl}${blog.image}`}

            alt={blog.title}

            className="img-fluid mb-4"

            style={{

              borderRadius: "10px",

              maxHeight: "500px",

              objectFit: "cover",

              width: "100%"

            }}

          />


          {/* ==========================================
              BLOG DESCRIPTION
          ========================================== */}

          <div

            className="fs-5"

            dangerouslySetInnerHTML={{

              __html:
                DOMPurify.sanitize(
                  blog.desc
                )

            }}

          />


          {/* ==========================================
              BLOG DATE
          ========================================== */}

          <p className="text-secondary">

            Posted on{" "}

            {new Date(
              blog.createdAt
            ).toLocaleDateString()}

          </p>


          <hr />


          {/* ==========================================
              COMMENTS SECTION
          ========================================== */}

          <div className="mt-5">


            {/* ==========================================
                COMMENTS TITLE
            ========================================== */}

            <h3 className="mb-4">

              Comments ({comments.length})

            </h3>


            {/* ==========================================
                NO COMMENTS
            ========================================== */}

            {comments.length === 0 ? (

              <p className="text-secondary">

                No comments yet.
                Be the first to comment!

              </p>

            ) : (

              comments.map((item) => (

                <div

                  key={item._id}

                  className="border rounded p-3 mb-4"

                >


                  {/* ==========================================
                      MAIN COMMENT USER + DATE
                  ========================================== */}

                  <div className="d-flex justify-content-between">

                    <strong>

                      {item.userId?.FullName ||

                        item.userId?.fullName ||

                        "User"}

                    </strong>


                    <small className="text-secondary">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </small>

                  </div>


                  {/* ==========================================
                      MAIN COMMENT TEXT
                  ========================================== */}

                  <p className="mt-2 mb-2">

                    {item.comment}

                  </p>


                  {/* ==========================================
                      REPLIES
                  ========================================== */}

                  {item.replies &&
                    item.replies.length > 0 && (

                    <div className="ms-5 mt-3">


                      {/* Replies title */}

                      <small className="text-secondary">

                        {item.replies.length}{" "}

                        {item.replies.length === 1
                          ? "Reply"
                          : "Replies"}

                      </small>


                      {/* ==========================================
                          REPLY LIST
                      ========================================== */}

                      <div className="mt-2">

                        {item.replies.map(
                          (reply) => (

                          <div

                            key={reply._id}

                            className="border-start ps-3 mb-3"

                          >


                            {/* Reply user + date */}

                            <div className="d-flex justify-content-between">

                              <strong>

                                {reply.userId?.FullName ||

                                  reply.userId?.fullName ||

                                  "User"}

                              </strong>


                              <small className="text-secondary">

                                {new Date(
                                  reply.createdAt
                                ).toLocaleString()}

                              </small>

                            </div>


                            {/* Reply text */}

                            <p className="mt-2 mb-0">

                              {reply.comment}

                            </p>

                          </div>

                        ))}

                      </div>

                    </div>

                  )}


                  {/* ==========================================
                      REPLY BUTTON
                  ========================================== */}

                  <button

                    className="btn btn-sm btn-outline-primary mt-2"

                    onClick={() => {

                      setReplyingTo(
                        item._id
                      );

                      setReplyText("");

                    }}

                  >

                    Reply

                  </button>


                  {/* ==========================================
                      REPLY FORM
                  ========================================== */}

                  {replyingTo === item._id && (

                    <div className="mt-3">


                      <textarea

                        className="form-control mb-2"

                        rows="2"

                        placeholder="Write a reply..."

                        value={replyText}

                        onChange={(e) =>
                          setReplyText(
                            e.target.value
                          )
                        }

                      />


                      {/* SUBMIT REPLY */}

                      <button

                        className="btn btn-primary btn-sm me-2"

                        onClick={() =>
                          handleReply(
                            item._id
                          )
                        }

                        disabled={
                          replySubmitting
                        }

                      >

                        {replySubmitting
                          ? "Submitting..."
                          : "Submit Reply"}

                      </button>


                      {/* CANCEL */}

                      <button

                        className="btn btn-secondary btn-sm"

                        onClick={() => {

                          setReplyingTo(null);

                          setReplyText("");

                        }}

                        disabled={
                          replySubmitting
                        }

                      >

                        Cancel

                      </button>


                    </div>

                  )}

                </div>

              ))

            )}

          </div>


          {/* ==========================================
              SHOW MORE COMMENTS
          ========================================== */}

          {commentPage < totalPages && (

            <div className="text-center mt-4">

              <button

                className="btn btn-outline-light"

                onClick={() =>
                  getComments(
                    commentPage + 1
                  )
                }

                disabled={
                  loadingComments
                }

              >

                {loadingComments

                  ? "Loading..."

                  : "Show More Comments"}

              </button>

            </div>

          )}


          {/* ==========================================
              COMMENT LOADING
          ========================================== */}

          {loadingComments && (

            <div className="text-center mt-3">

              <small className="text-secondary">

                Loading comments...

              </small>

            </div>

          )}


          <hr />


          {/* ==========================================
              LEAVE A COMMENT
          ========================================== */}
        <div className="row m-4">
          <h3 className="mt-5 mb-4">

            Leave a Comment

          </h3>
          <form
            onSubmit={
              handleSubmitComment
            }
          >


            <div className="mb-3">


              <label

                htmlFor="comment"

                className="form-label"

              >

                Comment

              </label>


              <textarea

                id="comment"

                className="form-control"

                rows="4"

                placeholder="Write your comment here..."

                value={comment}

                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }

              />


            </div>


            {/* ==========================================
                SUBMIT COMMENT
            ========================================== */}

            <button

              type="submit"

              className="btn btn-primary"

              disabled={submitting}

            >

              {submitting

                ? "Submitting..."

                : "Submit Comment"}

            </button>


          </form>
        </div>

        </div>

      </div>

    </div>

  );

};