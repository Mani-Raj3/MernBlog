import express from "express";
import { getDashboardStats } from "../controllers/Dashboard.js";

const router = express.Router();

router.get("/stats", getDashboardStats);

export default router;