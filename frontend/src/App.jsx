import { Routes, Route, Navigate } from "react-router-dom"
import LogInPage from './pages/LogInPage';
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage";
import NavBar from "./components/Navbar";


const App = () => {
  return (
    <div data-theme={"dark"}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/category" element={<CategoryPage />} />

      </Routes>

    </div>

  );
}

export default App;