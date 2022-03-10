import logo from "./logo.svg";
import "./App.css";
import { Home } from "./components/Home";
import { ShopDetails } from "./components/ShopDetails";
import { Route, Routes } from "react-router-dom";
import { Cart } from "./components/Cart";
import { Navbar } from "./components/Navbar";
import { CheckOut } from "./components/CheckOut";
import { History } from "./components/PaymentsHistory";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/shopdetails/:id" element={<ShopDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
        <Route path="/history" element={<History />}></Route>
      </Routes>
    </div>
  );
}

export default App;
