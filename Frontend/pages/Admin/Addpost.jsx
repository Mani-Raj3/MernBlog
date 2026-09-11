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


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../../src/services/Endpoint'

export const Addpost = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Please select a post image.");
      return;
    }

    const formData = new FormData();
    formData.append("postimage", image);
    formData.append("title", title);
    formData.append("desc", description);

    try {
      setIsSubmitting(true);
      await post("/blog/create", formData);
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
                <h2 className="text-center mb-0">Add New Post</h2>
              </div>

              <div className="card-body p-4">

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleSumbit}
                >

                  <div className="mb-4">
                    <label htmlFor="image" className="form-label">
                      Upload Image
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
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
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
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
                      {isSubmitting ? "Publishing..." : "Submit Post"}
                    </button>
                  </div>

                </form>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
