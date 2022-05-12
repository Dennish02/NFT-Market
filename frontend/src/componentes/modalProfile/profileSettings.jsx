import React, { useEffect, useRef } from "react";

import {
  MdSource,
  MdLogout,
  MdMonetizationOn,
  MdSettingsApplications,
} from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProfileSettings({ closeModal }) {
  const logout = () => {
    console.log("asd");
    localStorage.removeItem("token");
  };
  return (
    <div className="profileModal">
      <div className="divPortfolio">
        <Link to="/usuario/portfolio">
          <h3>portfolio</h3>
          <MdSource className="icon" />
        </Link>
      </div>

      <div className="divPortfolio">
        <Link to="/usuario/wallet">
          <h3>wallet</h3>
          <MdMonetizationOn className="icon" />
        </Link>
      </div>

      <div className="divPortfolio">
        <Link to="/usuario/setting">
          <h3>settings</h3>
          <MdSettingsApplications className="icon" />
        </Link>
      </div>

      <div className="divPortfolio" onClick={logout}>
        <Link to="/">
          <h3>logout</h3>

          <MdLogout className="icon" />
        </Link>
      </div>
    </div>
  );
}
