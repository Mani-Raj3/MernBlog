// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { BaseUrl, del, get } from "../../src/services/Endpoint";

// export const Allpost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Search
//   const [search, setSearch] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalBlogs, setTotalBlogs] = useState(0);

//   // =========================
//   // GET BLOGS
//   // =========================
//   const getPosts = async (page = 1, searchText = "") => {
//     try {
//       setLoading(true);

//       const response = await get("/blog/", {
//         page: page,
//         search: searchText,
//       });

//       console.log(response.data);

//       setPosts(response.data.blogs);
//       setTotalBlogs(response.data.totalBlogs);
//       setCurrentPage(response.data.currentPage);
//     } catch (error) {
//       console.log("Error fetching blogs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // FIRST API CALL
//   // =========================
//   useEffect(() => {
//     getPosts(1, "");
//   }, []);

//   // =========================
//   // SEARCH
//   // =========================
//   const handleSearch = (e) => {
//     const value = e.target.value;

//     setSearch(value);

//     // Search from page 1
//     getPosts(1, value);
//   };

//   // =========================
//   // DELETE
//   // =========================
//   const handleDelete = async (id) => {
//     try {
//       await del(`/blog/delete/${id}`);

//       // Remove deleted post from UI
//       setPosts((prevPosts) =>
//         prevPosts.filter((post) => post._id !== id)
//       );

//       // Decrease total count
//       setTotalBlogs((prev) => prev - 1);
//     } catch (error) {
//       console.log(
//         "Delete error:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // =========================
//   // UPDATE
//   // =========================
//   const handleUpdate = (id) => {
//     console.log("Update ID:", id);
//   };

//   // =========================
//   // COLUMNS
//   // =========================
//   const columns = [
//     {
//       name: "Image",

//       cell: (row) => (
//         <img
//           src={`${BaseUrl}${row.image}`}
//           alt={row.title}
//           style={{
//             width: "60px",
//             height: "60px",
//             objectFit: "cover",
//             borderRadius: "8px",
//           }}
//         />
//       ),

//       width: "100px",
//     },

//     {
//       name: "Title",
//       selector: (row) => row.title,
//       sortable: true,
//       grow: 2,
//     },

//     {
//       name: "Description",
//       selector: (row) => row.desc,
//       sortable: true,
//       grow: 3,
//     },

//     {
//       name: "Created At",
//       selector: (row) => row.createdAt,
//       sortable: true,

//       format: (row) =>
//         new Date(row.createdAt).toLocaleDateString("en-IN"),
//     },

//     {
//       name: "Actions",

//       cell: (row) => (
//         <div className="d-flex gap-2">

//           <button
//             className="btn btn-warning btn-sm"
//             onClick={() => handleUpdate(row._id)}
//           >
//             <FaEdit /> Update
//           </button>

//           <button
//             className="btn btn-danger btn-sm"
//             onClick={() => handleDelete(row._id)}
//           >
//             <FaTrashAlt /> Delete
//           </button>

//         </div>
//       ),

//       width: "220px",
//     },
//   ];

//   // =========================
//   // SEARCH COMPONENT
//   // =========================
//   const searchComponent = (
//     <input
//       type="text"
//       className="form-control"
//       placeholder="Search title or description..."
//       value={search}
//       onChange={handleSearch}
//       style={{
//         width: "300px",
//         marginBottom: "10px",
//       }}
//     />
//   );

//   // =========================
//   // RETURN
//   // =========================
//   return (
//     <div className="container mt-5">

//       <h2 className="text-white mb-4">
//         All Posts
//       </h2>

//       <DataTable
//         columns={columns}
//         data={posts}

//         keyField="_id"

//         // Search inside DataTable
//         subHeader
//         subHeaderComponent={searchComponent}
//         subHeaderAlign="right"

//         // Pagination
//         pagination
//         paginationServer
//         paginationTotalRows={totalBlogs}
//         paginationDefaultPage={currentPage}

//         onChangePage={(page) => {
//           setCurrentPage(page);
//           getPosts(page, search);
//         }}

//         // Loading
//         progressPending={loading}

//         // UI
//         highlightOnHover
//         striped
//         responsive
//       />

//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaSearch, FaSyncAlt, FaTimes, FaTrashAlt } from "react-icons/fa";
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

        <button
          type="button"
          className="btn btn-outline-light btn-sm"
          onClick={() => getPosts(currentPage, filters)}
          disabled={loading}
        >
          <FaSyncAlt className={loading ? "fa-spin me-2" : "me-2"} />
          Refresh
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-3 p-md-4">
          <div className="row g-3 mb-3">
            <div className="col-md-5">
              <label className="form-label small fw-semibold text-secondary" htmlFor="title-filter">Search by title</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0"><FaSearch className="text-secondary" /></span>
                <input id="title-filter" type="search" name="title" className="form-control border-start-0" placeholder="Post title..." value={filters.title} onChange={handleFilterChange} />
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold text-secondary" htmlFor="description-filter">Search by description</label>
              <input id="description-filter" type="search" name="description" className="form-control" placeholder="Post description..." value={filters.description} onChange={handleFilterChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold text-secondary" htmlFor="date-filter">Search by date</label>
              <input id="date-filter" type="date" name="date" className="form-control" value={filters.date} onChange={handleFilterChange} />
            </div>
          </div>
          {(filters.title || filters.description || filters.date) && (
            <div className="d-flex justify-content-end mb-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clearFilters}
              >
                <FaTimes className="me-1" /> Clear filters
              </button>
            </div>
          )}

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
