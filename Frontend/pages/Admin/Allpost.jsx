
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaEdit, FaFileCsv, FaFilePdf, FaPlus, FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BaseUrl, del, get } from "../../src/services/Endpoint";

const tableStyles = {
  headCells: {
    style: {
      backgroundColor: "#212529",
      color: "#ffffff",
      fontSize: "0.8rem",
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
  },
  rows: {
    style: { minHeight: "76px" },
    highlightOnHoverStyle: { backgroundColor: "#eef5ff", cursor: "pointer" },
  },
};

export const Allpost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({ title: "", description: "", date: "" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [exporting, setExporting] = useState(false);

  // Fetch the selected page from the backend, including all selected filters.
  const getPosts = async (page = 1, selectedFilters = filters, limit = rowsPerPage) => {
    try {
      setLoading(true);

      const response = await get("/blog/", { page, limit, ...selectedFilters });

      setPosts(response.data.blogs);
      setTotalBlogs(response.data.totalBlogs);
      setCurrentPage(response.data.currentPage);

    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // First API call
  useEffect(() => {
    getPosts(1, { title: "", description: "", date: "" });
  }, []);

  const handleFilterChange = (event) => {
    const nextFilters = { ...filters, [event.target.name]: event.target.value };

    setFilters(nextFilters);
    setResetPaginationToggle((previousValue) => !previousValue);
    // A filter change always starts at page one. The backend filters before
    // calculating pagination, so results and page totals stay correct.
    getPosts(1, nextFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { title: "", description: "", date: "" };
    setFilters(emptyFilters);
    setResetPaginationToggle((previousValue) => !previousValue);
    getPosts(1, emptyFilters);
  };

  const changeRowsPerPage = (nextRowsPerPage) => {
    setRowsPerPage(nextRowsPerPage);
    setResetPaginationToggle((previousValue) => !previousValue);
    getPosts(1, filters, nextRowsPerPage);
  };

  const getExportPosts = async () => {
    const response = await get("/blog/", { page: 1, limit: Math.max(totalBlogs, 1), ...filters });
    return response.data.blogs;
  };

  const exportCsv = async () => {
    try {
      setExporting(true);
      const exportPosts = await getExportPosts();
      const escapeCsvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
      const rows = exportPosts.map((post) => [
        post.title,
        post.desc,
        new Date(post.createdAt).toLocaleDateString("en-IN"),
      ]);
      const csv = [["Title", "Description", "Created At"], ...rows]
        .map((row) => row.map(escapeCsvValue).join(","))
        .join("\n");
      const file = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = "posts.csv";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.log("CSV export error:", error);
    } finally {
      setExporting(false);
    }
  };

  const exportPdf = async () => {
    try {
      setExporting(true);
      const exportPosts = await getExportPosts();
      const document = new jsPDF();
      document.text("Posts", 14, 15);
      autoTable(document, {
        startY: 22,
        head: [["Title", "Description", "Created At"]],
        body: exportPosts.map((post) => [
          post.title,
          post.desc,
          new Date(post.createdAt).toLocaleDateString("en-IN"),
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [33, 37, 41] },
      });
      document.save("posts.pdf");
    } catch (error) {
      console.log("PDF export error:", error);
    } finally {
      setExporting(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await del(`/blog/delete/${id}`);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== id)
      );

    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Update
  const handleUpdate = (id) => {
    console.log("Update ID:", id);
  };

  // Columns
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
      sortable: true,
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
    <div className="container mt-5 pb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="text-white mb-1">All Posts</h2>
          <p className="text-white-50 mb-0">
            {totalBlogs} {totalBlogs === 1 ? "post" : "posts"} found
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Link to="/dashboard/addpost" className="btn btn-primary btn-sm"><FaPlus className="me-1" /> Add Post</Link>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={exportCsv} disabled={exporting || !totalBlogs}>
            <FaFileCsv className="me-1" /> CSV
          </button>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={exportPdf} disabled={exporting || !totalBlogs}>
            <FaFilePdf className="me-1" /> PDF
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-3 p-md-4">
          <div className="row g-2 align-items-end mb-3">
            <div className="col-lg-3">
              <label className="form-label small fw-semibold text-secondary" htmlFor="title-filter">Search by title</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0"><FaSearch className="text-secondary" /></span>
                <input id="title-filter" type="search" name="title" className="form-control border-start-0" placeholder="Post title..." value={filters.title} onChange={handleFilterChange} />
              </div>
            </div>
            <div className="col-lg-3">
              <label className="form-label small fw-semibold text-secondary" htmlFor="description-filter">Search by description</label>
              <input id="description-filter" type="search" name="description" className="form-control" placeholder="Post description..." value={filters.description} onChange={handleFilterChange} />
            </div>
            <div className="col-lg-3">
              <label className="form-label small fw-semibold text-secondary" htmlFor="date-filter">Search by date</label>
              <input id="date-filter" type="date" name="date" className="form-control" value={filters.date} onChange={handleFilterChange} />
            </div>
            <div className="col-lg-3">
              <button type="button" className="btn btn-outline-secondary w-100" onClick={clearFilters} disabled={!filters.title && !filters.description && !filters.date}>
                <FaTimes className="me-1" /> Clear filters
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={posts}
            keyField="_id"
            pagination
            paginationServer
            paginationResetDefaultPage={resetPaginationToggle}
            paginationTotalRows={totalBlogs}
            paginationDefaultPage={currentPage}
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            onChangePage={(page) => {
              setCurrentPage(page);
              getPosts(page, filters);
            }}
            onChangeRowsPerPage={changeRowsPerPage}
            progressPending={loading}
            progressComponent={<div className="py-5 text-secondary">Loading posts...</div>}
            noDataComponent={<div className="py-5 text-secondary">No posts match the selected filters.</div>}
            highlightOnHover
            striped
            responsive
            persistTableHead
            customStyles={tableStyles}
          />
        </div>
      </div>
    </div>
  );
};
