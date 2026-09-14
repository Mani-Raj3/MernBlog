import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { get, patch, post } from "../../src/services/Endpoint";
import RichTextEditor from "../../src/Components/RichTextEditor";


export const Addpost = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    // true = update
    // false = create
    const isEditing = Boolean(id);


    // ==============================
    // STATES
    // ==============================

    const [image, setImage] = useState(null);

    const [title, setTitle] = useState("");

    const [slug, setSlug] = useState("");

    const [status, setStatus] = useState("active");

    const [isSlugEdited, setIsSlugEdited] = useState(false);

    const [description, setDescription] = useState("");

    // All field errors
    const [error_message, setErrorMessage] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [loadingPost, setLoadingPost] = useState(isEditing);


    // ==============================
    // CREATE SLUG
    // ==============================

    const createSlug = (value) => {

        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/[\s-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    };


    // ==============================
    // LOAD POST FOR UPDATE
    // ==============================

    useEffect(() => {

        if (!isEditing) {
            return;
        }


        const loadPost = async () => {

            try {

                setLoadingPost(true);

                const response = await get(`/blog/${id}`);

                const blog = response.data.blog;

                setTitle(blog.title || "");

                setSlug(
                    blog.slug ||
                    createSlug(blog.title || "")
                );

                setStatus(blog.status || "active");

                setDescription(blog.desc || "");

            } catch (requestError) {

                console.log(requestError);

                const responseData =
                    requestError.response?.data;

                if (responseData?.error_message) {

                    setErrorMessage(
                        responseData.error_message
                    );

                } else {

                    setErrorMessage({
                        general:
                            responseData?.message ||
                            "Unable to load this post."
                    });

                }

            } finally {

                setLoadingPost(false);

            }

        };


        loadPost();

    }, [id, isEditing]);


    // ==============================
    // IMAGE CHANGE
    // ==============================

    const handleImageChange = (event) => {

        const selectedImage =
            event.target.files?.[0];


        if (!selectedImage) {
            return;
        }


        // Check image type
        if (!selectedImage.type.startsWith("image/")) {

            setErrorMessage((prev) => ({
                ...prev,
                postimage:
                    "Only image files are allowed."
            }));

            setImage(null);

            event.target.value = "";

            return;
        }


        // Maximum 2 MB
        if (selectedImage.size > 2 * 1024 * 1024) {

            setErrorMessage((prev) => ({
                ...prev,
                postimage:
                    "Image size must not exceed 2 MB."
            }));

            setImage(null);

            event.target.value = "";

            return;
        }


        // Image is valid
        setImage(selectedImage);

        setErrorMessage((prev) => ({
            ...prev,
            postimage: ""
        }));

    };


    // ==============================
    // TITLE CHANGE
    // ==============================

    const handleTitleChange = (event) => {

        // Only letters and spaces
        const nextTitle =
            event.target.value.replace(
                /[^A-Za-z\s]/g,
                ""
            );


        // Count words
        const wordCount =
            nextTitle
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .length;


        // Maximum 50 words
        if (wordCount > 50) {

            setErrorMessage((prev) => ({
                ...prev,
                title:
                    "Title cannot contain more than 50 words."
            }));

            return;
        }


        setTitle(nextTitle);


        // Automatically create slug
        if (!isSlugEdited) {

            setSlug(createSlug(nextTitle));

        }


        // Remove title error
        setErrorMessage((prev) => ({
            ...prev,
            title: ""
        }));

    };


    // ==============================
    // SLUG CHANGE
    // ==============================

    const handleSlugChange = (event) => {

        setIsSlugEdited(true);

        const newSlug =
            createSlug(event.target.value);

        setSlug(newSlug);


        setErrorMessage((prev) => ({
            ...prev,
            slug: ""
        }));

    };


    // ==============================
    // STATUS CHANGE
    // ==============================

    const handleStatusChange = (event) => {

        const newStatus =
            event.target.value;

        setStatus(newStatus);


        setErrorMessage((prev) => ({
            ...prev,
            status: ""
        }));

    };


    // ==============================
    // DESCRIPTION CHANGE
    // ==============================

    const handleDescriptionChange = (value) => {

        setDescription(value);


        setErrorMessage((prev) => ({
            ...prev,
            desc: ""
        }));

    };


    // ==============================
    // SUBMIT
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Prevent double submit
        if (isSubmitting) {
            return;
        }


        // Clear previous errors
        setErrorMessage({});


        // ==============================
        // FRONTEND VALIDATION
        // ==============================

        const errors = {};


        // TITLE
        if (!title.trim()) {

            errors.title =
                "Title is required.";

        } else {

            const wordCount =
                title
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .length;


            if (wordCount > 50) {

                errors.title =
                    "Title cannot contain more than 50 words.";

            }


            if (!/^[A-Za-z\s]+$/.test(title.trim())) {

                errors.title =
                    "Title can contain only letters and spaces.";

            }

        }


        // SLUG
        if (!slug.trim()) {

            errors.slug =
                "Slug is required.";

        } else if (
            !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
        ) {

            errors.slug =
                "Slug can use lowercase letters, numbers and single hyphens only.";

        }


        // DESCRIPTION
        if (!description || !description.trim()) {

            errors.desc =
                "Description is required.";

        }


        // STATUS
        if (
            !["active", "inactive"].includes(status)
        ) {

            errors.status =
                "Status must be active or inactive.";

        }


        // IMAGE
        // Required only for new post
        if (!isEditing && !image) {

            errors.postimage =
                "Post image is required.";

        }


        // If validation failed
        if (Object.keys(errors).length > 0) {

            setErrorMessage(errors);

            return;
        }


        // ==============================
        // FORM DATA
        // ==============================

        const formData = new FormData();


        if (image) {

            formData.append(
                "postimage",
                image
            );

        }


        formData.append(
            "title",
            title.trim()
        );

        formData.append(
            "slug",
            slug.trim()
        );

        formData.append(
            "status",
            status
        );

        formData.append(
            "desc",
            description.trim()
        );


        // ==============================
        // API REQUEST
        // ==============================

        try {

            setIsSubmitting(true);


            let response;


            if (isEditing) {

                // UPDATE
                response = await patch(
                    `/blog/update/${id}`,
                    formData
                );

            } else {

                // CREATE
                response = await post(
                    "/blog/create",
                    formData
                );

            }


            // ==============================
            // SUCCESS ALERT
            // ==============================

            await Swal.fire({

                icon: "success",

                title: isEditing
                    ? "Post Updated!"
                    : "Post Created!",

                text:
                    response.data?.message ||
                    (
                        isEditing
                            ? "Post updated successfully."
                            : "Post created successfully."
                    ),

                confirmButtonText: "OK"

            });


            // Redirect
            navigate(
                "/dashboard/allposts",
                {
                    replace: true
                }
            );


        } catch (requestError) {

            console.log(requestError);


            const responseData =
                requestError.response?.data;


            // ==============================
            // FIELD-WISE BACKEND ERRORS
            // ==============================

            if (responseData?.error_message) {

                setErrorMessage(
                    responseData.error_message
                );

                return;
            }


            // ==============================
            // MESSAGE ERROR
            // ==============================

            if (responseData?.message) {

                if (
                    typeof responseData.message ===
                    "object"
                ) {

                    setErrorMessage(
                        responseData.message
                    );

                } else {

                    setErrorMessage({
                        general:
                            responseData.message
                    });

                }

                return;
            }


            // ==============================
            // UNKNOWN ERROR
            // ==============================

            setErrorMessage({
                general:
                    "Something went wrong. Please try again."
            });

        } finally {

            setIsSubmitting(false);

        }

    };


    // ==============================
    // CANCEL
    // ==============================

    const handleCancel = () => {

        navigate("/dashboard/allposts");

    };


    // ==============================
    // JSX
    // ==============================

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow-lg">


                        {/* =========================
                            HEADER
                        ========================= */}

                        <div className="card-header bg-primary text-white">

                            <h2 className="text-center mb-0">

                                {isEditing
                                    ? "Update Post"
                                    : "Add New Post"}

                            </h2>

                        </div>


                        {/* =========================
                            BODY
                        ========================= */}

                        <div className="card-body p-4">


                            {/* GENERAL ERROR */}

                            {error_message.general && (

                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error_message.general}
                                </div>

                            )}


                            {/* LOADING */}

                            {loadingPost ? (

                                <div className="text-center py-4">

                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >

                                        <span className="visually-hidden">
                                            Loading...
                                        </span>

                                    </div>


                                    <p className="mt-2">
                                        Loading post...
                                    </p>

                                </div>

                            ) : (

                                <form
                                    method="post"
                                    encType="multipart/form-data"
                                    onSubmit={handleSubmit}
                                >


                                    {/* =========================
                                        TITLE
                                    ========================= */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="postTitle"
                                            className="form-label fw-semibold"
                                        >
                                            Title
                                        </label>


                                        <input
                                            type="text"
                                            className={`form-control ${
                                                error_message.title
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="postTitle"
                                            placeholder="Enter post title"
                                            value={title}
                                            onChange={
                                                handleTitleChange
                                            }
                                        />


                                        <div className="form-text">

                                            Only letters and spaces.
                                            Maximum 50 words.

                                        </div>


                                        {error_message.title && (

                                            <div className="text-danger mt-1">

                                                {
                                                    error_message.title
                                                }

                                            </div>

                                        )}

                                    </div>


                                    {/* =========================
                                        SLUG
                                    ========================= */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="postSlug"
                                            className="form-label fw-semibold"
                                        >
                                            Slug
                                        </label>


                                        <input
                                            type="text"
                                            className={`form-control ${
                                                error_message.slug
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="postSlug"
                                            placeholder="my-post-slug"
                                            value={slug}
                                            onChange={
                                                handleSlugChange
                                            }
                                        />


                                        <div className="form-text">

                                            Lowercase letters,
                                            numbers and hyphens only.

                                        </div>


                                        {error_message.slug && (

                                            <div className="text-danger mt-1">

                                                {
                                                    error_message.slug
                                                }

                                            </div>

                                        )}

                                    </div>


                                    {/* =========================
                                        IMAGE
                                    ========================= */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="image"
                                            className="form-label fw-semibold"
                                        >
                                            Upload Image{" "}

                                            {isEditing &&
                                                "(optional)"}

                                        </label>


                                        <p className="form-text mt-0">

                                            Only image files are allowed.
                                            Maximum file size: 2 MB.

                                        </p>


                                        <input
                                            type="file"
                                            className={`form-control ${
                                                error_message.postimage
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="image"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                            onChange={
                                                handleImageChange
                                            }
                                            required={!isEditing}
                                        />


                                        {error_message.postimage && (

                                            <div className="text-danger mt-1">

                                                {
                                                    error_message.postimage
                                                }

                                            </div>

                                        )}

                                    </div>


                                    {/* =========================
                                        DESCRIPTION
                                    ========================= */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="postDescription"
                                            className="form-label fw-semibold"
                                        >
                                            Description
                                        </label>


                                        <div
                                            className={
                                                error_message.desc
                                                    ? "border border-danger rounded"
                                                    : ""
                                            }
                                        >

                                            <RichTextEditor

                                                id="postDescription"

                                                rows="12"

                                                placeholder="Write your post description here"

                                                value={description}

                                                onChange={
                                                    handleDescriptionChange
                                                }

                                            />

                                        </div>


                                        {error_message.desc && (

                                            <div className="text-danger mt-1">

                                                {
                                                    error_message.desc
                                                }

                                            </div>

                                        )}

                                    </div>


                                    {/* =========================
                                        STATUS
                                    ========================= */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold d-block">

                                            Status

                                        </label>


                                        <div className="d-flex gap-4">


                                            {/* ACTIVE */}

                                            <div className="form-check">

                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="status"
                                                    id="active"
                                                    value="active"
                                                    checked={
                                                        status ===
                                                        "active"
                                                    }
                                                    onChange={
                                                        handleStatusChange
                                                    }
                                                />


                                                <label
                                                    className="form-check-label"
                                                    htmlFor="active"
                                                >
                                                    Active
                                                </label>

                                            </div>


                                            {/* INACTIVE */}

                                            <div className="form-check">

                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="status"
                                                    id="inactive"
                                                    value="inactive"
                                                    checked={
                                                        status ===
                                                        "inactive"
                                                    }
                                                    onChange={
                                                        handleStatusChange
                                                    }
                                                />


                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inactive"
                                                >
                                                    Inactive
                                                </label>

                                            </div>

                                        </div>


                                        {error_message.status && (

                                            <div className="text-danger mt-1">

                                                {
                                                    error_message.status
                                                }

                                            </div>

                                        )}

                                    </div>


                                    {/* =========================
                                        BUTTONS
                                    ========================= */}

                                    <div className="d-flex gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg flex-grow-1"
                                            disabled={isSubmitting}
                                        >

                                            {isSubmitting ? (

                                                <>

                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />

                                                    {isEditing
                                                        ? "Updating..."
                                                        : "Publishing..."}

                                                </>

                                            ) : (

                                                isEditing
                                                    ? "Update Post"
                                                    : "Submit Post"

                                            )}

                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-lg"
                                            onClick={
                                                handleCancel
                                            }
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </form>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};