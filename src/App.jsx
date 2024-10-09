import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="product/detail" Component={ProductDetailPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
