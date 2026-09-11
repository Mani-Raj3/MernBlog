import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileCsv, FaFilePdf, FaSearch, FaTimes, FaTrashAlt } from "react-icons/fa";
import { BaseUrl, del, get } from "../../src/services/Endpoint";

const tableStyles = {
  headCells: { style: { backgroundColor: "#212529", color: "#fff", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" } },
  rows: { style: { minHeight: "70px" }, highlightOnHoverStyle: { backgroundColor: "#eef5ff" } },
};

export const User = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const getUsers = async (page = 1, selectedFilters = filters, limit = rowsPerPage) => {
    try {
      setLoading(true);
      const response = await get("/auth/users", { page, limit, ...selectedFilters });
      setUsers(response.data.users);
      setTotalUsers(response.data.totalUsers);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.log("Unable to get users:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(1, { name: "", email: "", date: "" });
  }, []);

  const handleFilterChange = (event) => {
    const nextFilters = { ...filters, [event.target.name]: event.target.value };
    setFilters(nextFilters);
    setResetPaginationToggle((value) => !value);
    getUsers(1, nextFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { name: "", email: "", date: "" };
    setFilters(emptyFilters);
    setResetPaginationToggle((value) => !value);
    getUsers(1, emptyFilters);
  };

  const getExportUsers = async () => {
    const response = await get("/auth/users", { page: 1, limit: Math.max(totalUsers, 1), ...filters });
    return response.data.users;
  };

  const exportCsv = async () => {
    try {
      setExporting(true);
      const exportUsers = await getExportUsers();
      const escapeCsvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
      const csv = [["Name", "Email", "Role", "Joined On"], ...exportUsers.map((user) => [user.FullName, user.email, user.role, new Date(user.createdAt).toLocaleDateString("en-IN")])]
        .map((row) => row.map(escapeCsvValue).join(",")).join("\n");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
      link.download = "users.csv";
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
      const exportUsers = await getExportUsers();
      const pdf = new jsPDF();
      pdf.text("Users", 14, 15);
      autoTable(pdf, { startY: 22, head: [["Name", "Email", "Role", "Joined On"]], body: exportUsers.map((user) => [user.FullName, user.email, user.role, new Date(user.createdAt).toLocaleDateString("en-IN")]), styles: { fontSize: 9 }, headStyles: { fillColor: [33, 37, 41] } });
      pdf.save("users.pdf");
    } catch (error) {
      console.log("PDF export error:", error);
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await del(`/auth/users/${id}`);
      getUsers(currentPage, filters);
    } catch (error) {
      window.alert(error.response?.data?.message || "Unable to delete user.");
    }
  };

  const columns = [
    { name: "Profile", cell: (row) => row.profile ? <img src={`${BaseUrl}/images/${row.profile}`} alt="" className="rounded-circle" style={{ width: 42, height: 42, objectFit: "cover" }} /> : <span className="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }}>{row.FullName?.charAt(0)?.toUpperCase()}</span>, width: "90px" },
    { name: "Name", selector: (row) => row.FullName, sortable: true, grow: 2 },
    { name: "Email", selector: (row) => row.email, sortable: true, grow: 2 },
    { name: "Role", selector: (row) => row.role, sortable: true, cell: (row) => <span className={`badge text-bg-${row.role === "admin" ? "primary" : "secondary"}`}>{row.role}</span> },
    { name: "Joined", selector: (row) => row.createdAt, sortable: true, format: (row) => new Date(row.createdAt).toLocaleDateString("en-IN") },
    { name: "Action", cell: (row) => <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(row._id)}><FaTrashAlt /> Delete</button>, width: "120px" },
  ];

  return (
    <div className="container mt-5 pb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div><h2 className="text-white mb-1">All Users</h2><p className="text-white-50 mb-0">{totalUsers} {totalUsers === 1 ? "user" : "users"} found</p></div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-light btn-sm" onClick={exportCsv} disabled={exporting || !totalUsers}><FaFileCsv className="me-1" /> CSV</button>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={exportPdf} disabled={exporting || !totalUsers}><FaFilePdf className="me-1" /> PDF</button>
        </div>
      </div>
      <div className="card shadow-sm border-0"><div className="card-body p-3 p-md-4">
        <div className="row g-2 align-items-end mb-3">
          <div className="col-lg-3"><label htmlFor="name-filter" className="form-label small fw-semibold text-secondary">Search by name</label><div className="input-group"><span className="input-group-text bg-white border-end-0"><FaSearch className="text-secondary" /></span><input id="name-filter" type="search" name="name" className="form-control border-start-0" placeholder="User name..." value={filters.name} onChange={handleFilterChange} /></div></div>
          <div className="col-lg-3"><label htmlFor="email-filter" className="form-label small fw-semibold text-secondary">Search by email</label><input id="email-filter" type="search" name="email" className="form-control" placeholder="Email address..." value={filters.email} onChange={handleFilterChange} /></div>
          <div className="col-lg-3"><label htmlFor="user-date-filter" className="form-label small fw-semibold text-secondary">Search by date</label><input id="user-date-filter" type="date" name="date" className="form-control" value={filters.date} onChange={handleFilterChange} /></div>
          <div className="col-lg-3"><button type="button" className="btn btn-outline-secondary w-100" onClick={clearFilters} disabled={!filters.name && !filters.email && !filters.date}><FaTimes className="me-1" /> Clear filters</button></div>
        </div>
        <DataTable columns={columns} data={users} keyField="_id" pagination paginationServer paginationResetDefaultPage={resetPaginationToggle} paginationTotalRows={totalUsers} paginationDefaultPage={currentPage} paginationPerPage={rowsPerPage} paginationRowsPerPageOptions={[5, 10, 20, 50]} onChangePage={(page) => { setCurrentPage(page); getUsers(page, filters); }} onChangeRowsPerPage={(limit) => { setRowsPerPage(limit); setResetPaginationToggle((value) => !value); getUsers(1, filters, limit); }} progressPending={loading} progressComponent={<div className="py-5 text-secondary">Loading users...</div>} noDataComponent={<div className="py-5 text-secondary">No users match the selected filters.</div>} highlightOnHover striped responsive persistTableHead customStyles={tableStyles} />
      </div></div>
    </div>
  );
};
