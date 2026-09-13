import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, patch, post } from '../../src/services/Endpoint'
import RichTextEditor from '../../src/Components/RichTextEditor'

export const Addpost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("active");
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) return;

    const loadPost = async () => {
      try {
        const response = await get(`/blog/${id}`);
        const blog = response.data.blog;
        setTitle(blog.title);
        setSlug(blog.slug || createSlug(blog.title));
        setStatus(blog.status || "active");
        setDescription(blog.desc);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load this post.");
      } finally {
        setLoadingPost(false);
      }
    };

    loadPost();
  }, [id, isEditing]);

  function createSlug(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

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
      if (!isSlugEdited) setSlug(createSlug(nextTitle));
      setError("");
    } else {
      setError("Title cannot contain more than 50 words.");
    }
  };

  const handleSlugChange = (event) => {
    setIsSlugEdited(true);
    setSlug(createSlug(event.target.value));
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
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError("Slug can use lowercase letters, numbers and single hyphens only.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("postimage", image);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("status", status);
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
                    <label htmlFor="postTitle" className="form-label">Title</label>
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
                    {/* <p className="form-text">Letters and spaces only, maximum 50 words.</p> */}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="postSlug" className="form-label">Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      id="postSlug"
                      placeholder="my-post-slug"
                      value={slug}
                      onChange={handleSlugChange}
                      required
                    />
                    {/* <p className="form-text">Generated from the title. You can edit it using lowercase letters, numbers, and hyphens.</p> */}
                  </div>

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
                    <label htmlFor="postDescription" className="form-label">
                      Description
                    </label>
                 <div className="rich-editor">
                    <RichTextEditor
                      className="form-control"
                      id="postDescription"
                      rows="12"
                      placeholder="Write your post description here"
                      value={description}
                      onChange={setDescription}
                      required
                    />
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <label htmlFor="postStatus" className="form-label">Status</label>
                    <select id="postStatus" className="form-select" value={status} onChange={(event) => setStatus(event.target.value)}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div> */}

{/* STATUS */}
            <div className="mb-4">
              <label className="form-label fw-semibold d-block">
                Status
              </label>

              <div className="d-flex gap-4">

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="active"
                    value="active"
                    checked={status === "active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="active"
                  >
                    Active
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="inactive"
                    value="inactive"
                    checked={status === "inactive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="inactive"
                  >
                    Inactive
                  </label>
                </div>

              </div>
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
