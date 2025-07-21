import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import Logo from "../assets/images/bull-seeklogo.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Logout Successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          width: "100%", // Full width
          padding: "0 1rem", // Horizontal space
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img src={Logo} alt="logo" style={{ height: "36px" }} />
        </Link>

        {/* Nav Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link to="/" style={navLinkStyle}>
            Home
          </Link>
          <Link to="/pages/features" style={navLinkStyle}>
            Features
          </Link>
          <Link to="/pages/workouts" style={navLinkStyle}>
            Workout Database
          </Link>
          <Link to="/pages/nutrition-checker" style={navLinkStyle}>
            Nutrition Checker
          </Link>
          <Link to="/pages/bmr-calculator" style={navLinkStyle}>
            BMR
          </Link>

          {userInfo ? (
            <div style={{ position: "relative" }}>
              <span style={{ fontWeight: "500" }}>{userInfo.name}</span>
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                }}
              >
                <Link to="/pages/profile" style={navLinkStyle}>
                  Profile
                </Link>
                <br />
                <button
                  onClick={logoutHandler}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#000",
                    padding: 0,
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/pages/register" style={navLinkStyle}>
                Register
              </Link>
              <Link to="/pages/login" style={navLinkStyle}>
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// Shared link styles
const navLinkStyle = {
  color: "#000",
  textDecoration: "none",
  fontWeight: "500",
};

export default Header;
