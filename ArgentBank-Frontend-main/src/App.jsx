import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import  UserHomePage from './components/UserHomePage';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          {/* <Route element={<UserHomePage />} /> */}
          <Route path="/profile" element={<UserHomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
