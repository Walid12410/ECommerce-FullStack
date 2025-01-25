const express =  require('express');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require("./middlewares/error");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use("/api/auth",require("./routes/authRoute"));
app.use("/api/user",require("./routes/userRoute"));
app.use("/api/category",require("./routes/categoryRoute"));
app.use("/api/sub-category",require("./routes/subCategoryRoute"));



// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});