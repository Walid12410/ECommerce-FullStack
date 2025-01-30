const express =  require('express');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require("./middlewares/error");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');  // Import cors

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow requests from this origin (your frontend)
  methods: 'GET,POST,PUT,DELETE',  // Specify allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization',  // Specify allowed headers
  credentials: true,  // Allow credentials like cookies
};

// Use CORS middleware with the above options
app.use(cors(corsOptions));


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookieParser());  // This should be placed before any routes
app.use(bodyParser.urlencoded({ extended: true }));


// Routesa
app.use("/api/auth",require("./routes/authRoute"));
app.use("/api/user",require("./routes/userRoute"));
app.use("/api/auth-company",require("./routes/companyAuthRoute"));
app.use("/api/category",require("./routes/categoryRoute"));
app.use("/api/sub-category",require("./routes/subCategoryRoute"));
app.use("/api/brand",require("./routes/brandRoute"));
app.use("/api/color",require("./routes/colorRoute"));
app.use("/api/gender",require("./routes/genderRoute"));
app.use("/api/product",require("./routes/productRoute"));



// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(PORT, "127.0.0.1" ,() => {
  console.log(`Server running on http://localhost:${PORT}`);
});