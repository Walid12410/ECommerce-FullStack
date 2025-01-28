import { Routes, Route, Navigate } from "react-router-dom"
import LogInPage from './pages/LogInPage';
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";


const App = () => {
  return (
    <div data-theme={"dark"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<SignUpPage />} />

      </Routes>

    </div>

  );
}

export default App;