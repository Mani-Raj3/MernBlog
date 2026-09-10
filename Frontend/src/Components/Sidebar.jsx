import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaFileAlt, FaHome, FaPlusSquare, FaUsers } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const isPostRoute = pathname.includes("/dashboard/addpost") || pathname.includes("/dashboard/allposts");
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(isPostRoute);

  return (
    <aside className="sidebar text-white">
      <nav className="px-2" aria-label="Dashboard navigation">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span className="menu-left"><FaHome /> Dashboard</span>
        </NavLink>

        <button
          type="button"
          className={`sidebar-link border-0 w-100 bg-transparent ${isPostRoute ? "active" : ""}`}
          onClick={() => setIsPostMenuOpen((open) => !open)}
          aria-expanded={isPostMenuOpen}
          aria-controls="post-submenu"
        >
          <span className="menu-left"><FaFileAlt /> Post</span>
          {isPostMenuOpen ? <FaChevronDown /> : <FaChevronRight />}
        </button>

        {isPostMenuOpen && (
          <div id="post-submenu" className="submenu">
            <NavLink to="/dashboard/allposts" className={({ isActive }) => `submenu-link ${isActive ? "submenu-active" : ""}`}>
              <FaFileAlt /> All Posts
            </NavLink>
            <NavLink to="/dashboard/addpost" className={({ isActive }) => `submenu-link ${isActive ? "submenu-active" : ""}`}>
              <FaPlusSquare /> Add Post
            </NavLink>
          </div>
        )}

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span className="menu-left"><FaUsers /> All Users</span>
        </NavLink>
      </nav>
    </aside>
  );
};
