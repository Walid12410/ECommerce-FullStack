const express =  require('express');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require("./middlewares/error");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');  // Import cors


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());  // This should be placed before any routes


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
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use("/api/auth",require("./routes/authRoute"));
app.use("/api/user",require("./routes/userRoute"));
app.use("/api/auth-company",require("./routes/companyAuthRoute"));
app.use("/api/company",require("./routes/companyRoute"));
app.use("/api/category",require("./routes/categoryRoute"));
app.use("/api/sub-category",require("./routes/subCategoryRoute"));
app.use("/api/brand",require("./routes/brandRoute"));
app.use("/api/color",require("./routes/colorRoute"));
app.use("/api/gender",require("./routes/genderRoute"));
app.use("/api/product",require("./routes/productRoute"));
app.use("/api/product-size",require("./routes/productSizeRoute"));
app.use("/api/banner",require("./routes/bannerRoute"));
app.use("/api/feature",require("./routes/featureRoute"));
app.use("/api/offer",require("./routes/offerRoute"));
app.use("/api/coupon", require("./routes/couponRoute"));
app.use("/api/order", require("./routes/orderRoute"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(PORT, "127.0.0.1" ,() => {
  console.log(`Server running on http://localhost:${PORT}`);
});