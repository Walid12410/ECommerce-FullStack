import { Routes, Route, Navigate } from "react-router-dom"
import LogInPage from './pages/LogInPage';
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import NavBar from "./components/Navbar";
import BrandPage from "./pages/BrandPage/BrandPage";
import ProductGenderPage from "./pages/ProductGenderPage/ProductGenderPage";


const App = () => {
  return (
    <div data-theme={"dark"} >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/collection/:id" element={<ProductGenderPage />} />
      </Routes>
    </div>
  );
}

export default App;