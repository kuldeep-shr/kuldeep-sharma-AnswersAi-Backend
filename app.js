import express from "express";
import sequelize from "./config/Database.js";
import indexRoute from "./routes/routes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", indexRoute);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
