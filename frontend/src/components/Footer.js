import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          justifyContent: "flex-end",
          color: "#000",
        }}
      >
        © {new Date().getFullYear()} Locked In
      </div>
    </footer>
  );
};

export default Footer;
