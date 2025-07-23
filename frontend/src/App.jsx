import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/signupPage.jsx";
import { useUserStore } from "./store/useUserStore.js";

function App() {
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <div>
        <Routes> 
          <Route path="/" element={<LoginPage />} /> 
          <Route 
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route 
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div> 
      <Toaster />
    </div>
  );
}
export default App;
