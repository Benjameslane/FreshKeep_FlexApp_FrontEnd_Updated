import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const showHomeOwner = user && user.userType === "Homeowner/Renter";
  const showStoreOwner = user && user.userType === "Store Owner";

  return (
    <nav className="nav-bar">
      <div className="brand">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <img src="/FK.png" alt="FreshKeep Logo" className="navbar-logo" />
          <b></b>
        </Link>
      </div>
      <ul className="nav-menu">
        {showHomeOwner && (
          <>
            <li>
              <Link to="/inventory" className="nav-link">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="nav-link">
                Recipes
              </Link>
            </li>
          </>
        )}
        {showStoreOwner && (
          <li>
            <Link to="/inventory" className="nav-link">
              Inventory
            </Link>
          </li>
        )}
        {(showHomeOwner || showStoreOwner) && (
          <li>
            <Link to="/discountedItems" className="nav-link">
              Discounted Items
            </Link>
          </li>
        )}
        <li>
          <Link to="/foodShelters" className="nav-link">
            Food Shelters
          </Link>
        </li>
      </ul>
      <div className="user-actions">
        {user ? (
          <button onClick={logoutUser}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
