import { Routes, Route, Navigate } from "react-router-dom"
import LogInPage from './pages/AuthPage/LogInPage';
import SignUpPage from "./pages/AuthPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import BrandPage from "./pages/BrandPage/BrandPage";
import ProductGenderPage from "./pages/ProductGenderPage/ProductGenderPage";
import ProductBrandPage from "./pages/ProductBrandPage/ProductBrandPage";
import CompanyPage from "./pages/CompanyPage/CompanyPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage/CompanyDetailsPage";
import GuestNavBar from "./components/GuestNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserAuth } from "./redux/slices/authSlice";
import { Toaster } from "react-hot-toast";
import OfferPage from "./pages/OfferPage/OfferPage";
import BottomNavBar from "./components/BottomNavBar";
import AdminLoginPage from "./pages/AdminPages/LoginPage";
import AdminDashBoardPage from "./pages/AdminPages/AdminDashBoardPage";
import ViewUserPage from "./pages/AdminPages/ViewUserPage";


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
  }, [dispatch]);

  const { authUser } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [hideGuest, setHideGuest] = useState(false);

  return (
    <div data-theme={theme}>
      {!authUser && !hideGuest && (
        <GuestNavBar setHideGuest={setHideGuest} />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/brand/:id" element={<ProductBrandPage />} />
        <Route path="/collection/:id" element={<ProductGenderPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company/:id" element={<CompanyDetailsPage />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashBoardPage />} />
        <Route path="/admin/view-user" element={<ViewUserPage />} />

      </Routes>
      {(!authUser || (authUser && !authUser.IsAdmin)) && (
        <BottomNavBar />
      )}
      <Toaster />
    </div>
  );
}

export default App;