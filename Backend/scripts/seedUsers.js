import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "../models/user.js";

dotenv.config();

const sampleUsers = [
  { FullName: "Aarav Sharma", email: "aarav.sharma@example.com" },
  { FullName: "Priya Patel", email: "priya.patel@example.com" },
  { FullName: "Rohan Verma", email: "rohan.verma@example.com" },
  { FullName: "Ananya Singh", email: "ananya.singh@example.com" },
  { FullName: "Vikram Mehta", email: "vikram.mehta@example.com" },
  { FullName: "Neha Gupta", email: "neha.gupta@example.com" },
  { FullName: "Kabir Kapoor", email: "kabir.kapoor@example.com" },
  { FullName: "Isha Nair", email: "isha.nair@example.com" },
  { FullName: "Arjun Rao", email: "arjun.rao@example.com" },
  { FullName: "Meera Iyer", email: "meera.iyer@example.com" },
  { FullName: "Siddharth Jain", email: "siddharth.jain@example.com" },
  { FullName: "Kavya Desai", email: "kavya.desai@example.com" },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const password = await bcryptjs.hash("User@123", 10);
    const operations = sampleUsers.map((user) => ({
      updateOne: {
        filter: { email: user.email },
        update: { $setOnInsert: { ...user, password, role: "user", profile: "" } },
        upsert: true,
      },
    }));
    const result = await UserModel.bulkWrite(operations);
    console.log(`Sample users ready. Added: ${result.upsertedCount}, already existed: ${sampleUsers.length - result.upsertedCount}.`);
  } catch (error) {
    console.error("Unable to seed sample users:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedUsers();
