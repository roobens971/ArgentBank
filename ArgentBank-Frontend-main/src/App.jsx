// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UserHomePage from "./components/UserHomePage";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<UserHomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
