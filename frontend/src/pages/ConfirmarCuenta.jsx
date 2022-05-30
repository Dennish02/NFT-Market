import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../../redux/actions/actionUSER.js";

export default function ConfirmarCuenta() {
  const dispatch = useDispatch();
  const respuesta = useSelector((state) => state.confirmacion);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(validateUser(id));
  }, []);

  return (
    <div className="contConfirmar">
      <h2>
        Welcome to <span>NFT</span> Market
      </h2>
      <div>{respuesta.msg}</div>
      <Link to="/">
        <button className="buttonPrimary">Go back home</button>
      </Link>
    </div>
  );
}
