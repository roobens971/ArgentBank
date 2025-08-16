// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import UserHomePage from "./components/UserHomePage";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  // On récupère le token depuis Redux
  const token = useSelector((state) => state.user.token);
  const isLoggedIn = !!token; // true si token existe

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout isLoggedIn={isLoggedIn} />}
        >
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<UserHomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

