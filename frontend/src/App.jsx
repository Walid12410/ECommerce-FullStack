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
import AdminDashBoardPage from "./pages/AdminPages/Dashboard/AdminDashBoardPage";
import ViewUserPage from "./pages/AdminPages/User/ViewUserPage";
import AddUserPage from "./pages/AdminPages/User/AddUserPage";
import ViewBrandPage from "./pages/AdminPages/Brand/ViewBrandPage";
import ViewCompanyPage from "./pages/AdminPages/Company/ViewCompanyPage";
import ViewColorPage from "./pages/AdminPages/Color/ViewColorPage";
import ViewProductPage from "./pages/AdminPages/Product/ViewProductPage";
import ViewCategoryPage from "./pages/AdminPages/Category/ViewCategoryPage";
import ViewFeaturePage from "./pages/AdminPages/Feature/ViewFeaturePage";
import AdminLoginPage from "./pages/AdminPages/auth/LoginPage";
import AddFeaturePage from "./pages/AdminPages/Feature/AddFeaturePage";
import CompanyDashBoardPage from "./pages/AdminPages/Dashboard/CompanyDashBoardPage";
import ProductDetailPage from "./pages/ProductDetailsPage/ProductDetails";
import CartPage from "./pages/CartPage/CartPage";
import ProfileUpdatePage from "./pages/EditProfilePage/EditProfilePage";
import AddCompanyPage from "./pages/AdminPages/Company/AddCompanyPage";
import AddCategoryPage from "./pages/AdminPages/Category/AddCategoryPage";
import UserOrdersPage from "./pages/UserOrdersPage/UserOrdersPage";


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
        <Route path="/category/:subCategoryId" element={<CategoryPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/brand/:id" element={<ProductBrandPage />} />
        <Route path="/collection/:id" element={<ProductGenderPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company/:id" element={<CompanyDetailsPage />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfileUpdatePage />} />
        <Route path="/orders" element={<UserOrdersPage />} />

        {/** Admin Pages */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashBoardPage />} />
        <Route path="/admin/view-user" element={<ViewUserPage />} />
        <Route path="/admin/add-user" element={<AddUserPage />} />
        <Route path="/admin/view-brand" element={<ViewBrandPage />} />
        <Route path="/admin/view-company" element={<ViewCompanyPage />} />
        <Route path="/admin/add-company" element={<AddCompanyPage />} />
        <Route path="/admin/view-color" element={<ViewColorPage />} />
        <Route path="/admin/view-product" element={<ViewProductPage />} />
        <Route path="/admin/view-category" element={<ViewCategoryPage />} />
        <Route path="/admin/view-feature" element={<ViewFeaturePage />} />
        <Route path="/admin/add-feature" element={<AddFeaturePage />} />
        <Route path="/admin/add-category" element={<AddCategoryPage />} />

        {/** Company Pages */}
        <Route path="/company/dashboard" element={<CompanyDashBoardPage />} />
        <Route path="/company/view-company" element={<ViewCompanyPage />} />
        <Route path="/company/view-product" element={<ViewProductPage />} />

      </Routes>
      {(!authUser || (authUser && !authUser.IsAdmin)) && (
        <BottomNavBar />
      )}
      <Toaster />
    </div>
  );
}

export default App;