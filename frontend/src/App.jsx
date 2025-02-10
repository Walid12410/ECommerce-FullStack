import { Routes, Route, Navigate } from "react-router-dom"
import LogInPage from './pages/AuthPage/LogInPage';
import SignUpPage from "./pages/AuthPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import BrandPage from "./pages/BrandPage/BrandPage";
import ProductGenderPage from "./pages/ProductGenderPage/ProductGenderPage";
import ProductBrandPage from "./pages/ProductBrandPage/ProductBrandPage";
import CompanyPage from "./pages/CompanyPage/CompanyPage";


const App = () => {
  return (
    <div data-theme={"dark"} >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/brand/:id" element={<ProductBrandPage />} />
        <Route path="/collection/:id" element={<ProductGenderPage />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </div>
  );
}

export default App;