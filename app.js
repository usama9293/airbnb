import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongodb from "./config/db.js";
import listingRoute from "./routes/listingRoute.js";
import methodOverride from "method-override";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to serve static files and parse JSON
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use method-override middleware
app.use(methodOverride("_method"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Use listingRoute for handling listing-related routes
app.use("/", listingRoute);

// Improved database connection and initialization
async function startServer() {
  try {
    await mongodb(); // Connect to the database
    console.log("Database connected");

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit with a failure code
  }
}

// Start the server
startServer();
