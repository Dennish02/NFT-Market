import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateUser } from "../../redux/actions/actionUSER";

export default function ConfirmarCuenta() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(validateUser(id));
  }, []);

  return (
    <div className="contConfirmar">
      <h2>
        Bienvenido a <span>NFT</span> Market
      </h2>
    </div>
  );
}
