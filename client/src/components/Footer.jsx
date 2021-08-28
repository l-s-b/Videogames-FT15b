import React from "react";

const Footer = function () {
  return (
    <div className="Footer">
      <p>
        Created with <span role="img" aria-label="Henry Heart">💛</span> (and{" "}
        <a className='link' href="https://rawg.io/apidocs">
          RAWG API
          </a>
        ) in 🇦🇷
      </p>
    </div>
  );
};
export default Footer;