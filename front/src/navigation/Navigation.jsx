import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import SignIn from "../pages/signIn/SignIn";
import Nav from "../components/navComponents/Nav";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
