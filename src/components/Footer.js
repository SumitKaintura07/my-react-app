import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} My React App. All rights reserved.
        </p>
        <p className="mb-0">Made with ❤️ by Sumit</p>
      </div>
    </footer>
  );
};

export default Footer;
