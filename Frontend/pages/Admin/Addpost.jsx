// // import React from 'react'
// import React, { useState } from 'react'
// export const Addpost = () => {
//   return (
//     <>
  
//   <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card shadow-lg">
//             <div className="card-header bg-primary text-white">
//               <h2 className="text-center mb-0">Add New Post</h2>
//             </div>
//             <div className="card-body p-4">
//               <div   method='post' encType='multipart/form-data'>
//                 <div className="mb-4">
//                   <label htmlFor="postImage" className="form-label">Upload Image</label>
//                   <input 
//   type="file" 
//   className="form-control" 
//   id="image" 
//   onChange={(e) => setImage(e.target.files[0])} 
// />

//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="postTitle" className="form-label">Title</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     id="postTitle" 
//                     placeholder="Enter post title" 
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)} 
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="postDescription" className="form-label">Description</label>
//                   <textarea 
//                     className="form-control" 
//                     id="postDescription" 
//                     rows="6" 
//                     placeholder="Write your post description here" 
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)} 
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary btn-lg" onClick={handleSumbit}>Submit Post</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>


//     </>
//   )
// }


import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, patch, post } from '../../src/services/Endpoint'

export const Addpost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) return;

    const loadPost = async () => {
      try {
        const response = await get(`/blog/${id}`);
        setTitle(response.data.blog.title);
        setDescription(response.data.blog.desc);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load this post.");
      } finally {
        setLoadingPost(false);
      }
    };

    loadPost();
  }, [id, isEditing]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (!selectedImage) return;

    if (!selectedImage.type.startsWith("image/")) {
      setError("Only image files are allowed.");     // here we can upload only image
      event.target.value = "";
      return;
    }
    if (selectedImage.size > 2 * 1024 * 1024) {
      setError("Image size must not exceed 2 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setImage(selectedImage);
  };

  const handleTitleChange = (event) => {
    const nextTitle = event.target.value.replace(/[^A-Za-z\s]/g, "");
    const wordCount = nextTitle.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount <= 50) {
      setTitle(nextTitle);
      setError("");
    } else {
      setError("Title cannot contain more than 50 words.");
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image && !isEditing) {
      setError("Please select a post image.");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(title.trim())) {
      setError("Title can contain only letters and spaces.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("postimage", image);
    formData.append("title", title);
    formData.append("desc", description);

    try {
      setIsSubmitting(true);
      if (isEditing) {
        await patch(`/blog/update/${id}`, formData);
      } else {
        await post("/blog/create", formData);
      }
      navigate("/dashboard/allposts", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create the post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">

            <div className="card shadow-lg">

              <div className="card-header bg-primary text-white">
                <h2 className="text-center mb-0">{isEditing ? "Update Post" : "Add New Post"}</h2>
              </div>

              <div className="card-body p-4">

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                {loadingPost ? <p className="text-center mb-0">Loading post...</p> : <form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleSumbit}
                >

                  <div className="mb-4">
                    <label htmlFor="image" className="form-label">
                      Upload Image {isEditing && "(optional)"}
                    </label>

                    <p className="form-text mt-0">Only image files are allowed. Maximum file size: 2 MB.</p>

                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!isEditing}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="postTitle" className="form-label">
                      Title
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder="Enter post title"
                      value={title}
                      onChange={handleTitleChange}
                      maxLength={300}
                      required
                    />
                    <p className="form-text">Letters and spaces only, maximum 50 words.</p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="postDescription" className="form-label">
                      Description
                    </label>

                    <textarea
                      className="form-control"
                      id="postDescription"
                      rows="6"
                      placeholder="Write your post description here"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (isEditing ? "Updating..." : "Publishing...") : (isEditing ? "Update Post" : "Submit Post")}
                    </button>
                  </div>

                </form>}

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
