import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const showHomeOwner = user && user.userType === "Homeowner/Renter";
  const showStoreOwner = user && user.userType === "Store Owner";

  return (
    <div className="nav-bar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>FreshKeep</b>
          </Link>
        </li>
        <li className="nav-menu">
          {showHomeOwner && (
            <>
              <Link to="/inventory" style={{ textDecoration: "none", color: "white" }}>
                <p className="nav-link">Inventory</p>
              </Link>
              <Link to="/recipes" style={{ textDecoration: "none", color: "white" }}>
                <p className="nav-link">Recipes</p>
              </Link>
            </>
          )}
          {showStoreOwner && (
            <>
              <Link to="/inventory" style={{ textDecoration: "none", color: "white" }}>
                <p className="nav-link">Inventory</p>
              </Link>
            </>
          )}
          {(showHomeOwner || showStoreOwner) && (
            <>
              <Link to="/discountedItems" style={{ textDecoration: "none", color: "white" }}>
                <p className="nav-link">Discounted Items</p>
              </Link>
            </>
          )}
          <Link to="/foodShelters" style={{ textDecoration: "none", color: "white" }}>
            <p className="nav-link">Food Shelters</p>
          </Link>
        </li>
        <li className="user-type">
          {showHomeOwner && (
            <>
              <p>Homeowner/Renter</p>
            </>
          )}
          {showStoreOwner && (
            <>
              <p>Store Owner</p>
            </>
          )}
        </li>
        <li className="login-logout">
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
