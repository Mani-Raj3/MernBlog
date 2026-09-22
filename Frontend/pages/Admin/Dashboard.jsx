// import React from 'react'
import React, { useEffect, useState } from "react";
import { get } from "../../src/services/Endpoint";

export const Dashboard = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0
  });

  const getDashboardStats = async () => {
    try {

      const response = await get("/dashboard/stats");

      console.log("Dashboard API Response:", response);

      setStats({
        totalUsers: response.data.totalUsers,
        totalPosts: response.data.totalPosts,
        totalComments: response.data.totalComments
      });

    } catch (error) {
      console.log("Dashboard Stats Error:", error);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <>
      <div>
        <h2 className="mb-4 text-white">Dashboard</h2>

        <div className='row'>

          <div className='col-md-4 col-lg-4 col-sm-4 co-12'>
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4 col-lg-4 col-sm-4 co-12'>
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Post</h5>
                <p className="card-text">{stats.totalPosts}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4 col-lg-4 col-sm-4 co-12'>
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Comments</h5>
                <p className="card-text">{stats.totalComments}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
