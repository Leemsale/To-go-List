import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear(); // get current year dynamically

  return (
    <footer className="text-center py-3 mt-auto text-white">
      <p>&copy; {currentYear} LilyEarn. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;