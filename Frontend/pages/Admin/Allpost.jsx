import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BaseUrl, del, get } from "../../src/services/Endpoint";

export const Allpost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  // Fetch blogs
  const getPosts = async (page) => {
    try {
      setLoading(true);

      const response = await get("/blog/", { page });

      console.log(response.data);

      setPosts(response.data.blogs);
      setTotalBlogs(response.data.totalBlogs);
      setCurrentPage(response.data.currentPage);

    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch first page when component loads
  useEffect(() => {
    getPosts(1);
  }, []);

  // Delete
  const handleDelete = async (id) => {
    console.log("Delete ID:", id);

    // Later you can call:
     await del(`/blog/delete/${id}`);

    // For now remove from UI
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== id)
    );
  };

  // Update
  const handleUpdate = (id) => {
    console.log("Update ID:", id);

    // Later:
    // navigate(`/update/${id}`);
  };

  // DataTable columns
  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`${BaseUrl}${row.image}`}
          alt={row.title}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
      width: "100px",
    },

    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      grow: 2,
    },

    {
      name: "Description",
      selector: (row) => row.desc,
      grow: 3,
    },

    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      format: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-IN"),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">

          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleUpdate(row._id)}
          >
            <FaEdit /> Update
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
          >
            <FaTrashAlt /> Delete
          </button>

        </div>
      ),
      width: "220px",
    },
  ];

  return (
    <div className="container mt-5">

      <h2 className="text-white mb-4">
        All Posts
      </h2>

      <DataTable
        columns={columns}
        data={posts}

        // MongoDB _id
        keyField="_id"

        // Pagination
        pagination
        paginationServer
        paginationTotalRows={totalBlogs}
        paginationDefaultPage={currentPage}

        // When user clicks page 2
        onChangePage={(page) => {
          setCurrentPage(page);
          getPosts(page);
        }}

        // Loading
        progressPending={loading}

        // UI
        highlightOnHover
        striped
        responsive
      />

    </div>
  );
};
