import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5123; // Using port 5123 from your file

import userRoutes from "./routes/userRoutes.js";
import userStatusRoutes from "./routes/userStatusRoutes.js";
import UserMealPlanRoutes from "./routes/UserMealPlanRoutes.js";

connectDB(); // Connect to your MongoDB database

const app = express();

// --- Body Parsers ---
// These should generally come before other middleware that might need to read the body.
app.use(express.json()); // Allows parsing of JSON request bodies
app.use(express.urlencoded({ extended: true })); // Allows parsing of URL-encoded request bodies

app.use(cookieParser()); // Parses cookies attached to the request

// --- CORS Configuration ---
// Place CORS middleware early in the chain, right after body parsers.
const corsOptions = {
  origin: "*", // Allows requests from any origin. Use specific origins for production!
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all HTTP methods your frontend uses
  allowedHeaders: ["Content-Type", "Authorization"], // Allow common headers
  credentials: true, // Allow cookies and authorization headers to be sent cross-origin
};
app.use(cors(corsOptions));
// --- End CORS Configuration ---

// --- API Routes ---
// These routes are prefixed with /api/
app.use("/api/users", userRoutes);
app.use("/api/user", userStatusRoutes);
app.use("/api/user", UserMealPlanRoutes);

// --- Static Assets and SPA Fallback for Production ---
if (process.env.NODE_ENV === "production") {
  // Resolve the __dirname for ES Modules
  const __dirname = path.resolve();
  // Serve static files from the 'frontend/build' directory
  app.use(express.static(path.join(__dirname, "frontend/build")));

  // Any other GET request not handled by API routes will serve the React app's index.html
  // This is crucial for client-side routing (e.g., React Router)
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // In development mode, a simple message at the root
  app.get("/", (req, res) => res.send("Server is ready for development"));
}

// --- Error Handling Middleware ---
// These should be the last middleware in your chain.
app.use(notFound); // Catches 404s for routes not found by Express
app.use(errorHandler); // Handles other errors

// --- Start the Server ---
app.listen(port, () => console.log(`Server started on port ${port}`));

// Export the app for testing or other modules if needed
export default app;