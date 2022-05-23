import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  MdSource,
  MdLogout,
  MdMonetizationOn,
  MdSettingsApplications,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { userLogout } from "../../../redux/actions/actionUSER";
import { useDispatch } from "react-redux";

export default function ProfileSettings({ closeModal }) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!token) {
    navigate("/");
  }

  function logOut() {
    dispatch(userLogout);
  }

  return (
    <div className="profileModal">
      <div className="divPortfolio">
        <Link to="/home/usuario/portfolio">
          <h3>portfolio</h3>
          <MdSource className="icon" />
        </Link>
      </div>

      <div className="divPortfolio">
        <Link to="/home/usuario/wallet">
          <h3>wallet</h3>
          <MdMonetizationOn className="icon" />
        </Link>
      </div>

      <div className="divPortfolio">
        <Link to="/home/usuario/setting">
          <h3>settings</h3>
          <MdSettingsApplications className="icon" />
        </Link>
      </div>

      <div onClick={() => logOut()} className="divPortfolio">
        <Link to="/">
          <h3>logout</h3>
          <MdLogout className="icon" />
        </Link>
      </div>
    </div>
  );
}
