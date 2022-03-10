import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <>
      <nav>
        <h1 onClick={navigateToHome}>Punctured</h1>
        <ul>
          <li>
            <span>
              <i class="fa fa-home" style={{ color: "white" }}></i>
            </span>
            <Link to={"/"} className="link-tag">
              Home
            </Link>
          </li>
          <li>
            <span>
              <i class="fa fa-shopping-cart" style={{ color: "white" }}></i>
            </span>
            <Link to="/cart" className="link-tag">
              Cart
            </Link>
          </li>
          <li>
            <span>
              <i class="fa fa-history" style={{ color: "white" }}></i>
            </span>
            <Link to="/history" className="link-tag">
              Payment history
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
