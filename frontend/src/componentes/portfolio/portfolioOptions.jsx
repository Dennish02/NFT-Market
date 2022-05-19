import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { crearColeccion } from "../../../redux/actions/actionColeccion";
import { toast } from "react-toastify";
import { coleccionesUsuario } from "../../../redux/actions/actionColeccion";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

export default function PortfoliOptions() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const colecciones = useSelector((state) => state.colecciones);

  function showModal() {
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function crear() {
    if (input.length > 8)
      return toast.error("el nombre puede tener hasta 8 caracteres");
    dispatch(crearColeccion(input));
    closeModal();
  }

  return (
    <div>
      <div className="contButton">
        <Link to="/home/usuario/nft/crear/">
          <button className="buttonPrimary">CREAR NFT</button>
        </Link>
        <button className="buttonOrange" onClick={showModal}>
          CREAR COLECCION
        </button>
        <Link to="#">
          <button className="buttonMorado">MIS FAVORITOS</button>
        </Link>
      </div>

      <div className="contTittle">
        <h2 className="tuPortfolio">your portfolio</h2>
        <div>
          <select className="coleccion" name="colection" id="">
            <option value="all">Todas</option>
            {colecciones?.map((col, i) => (
              <option key={i} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Modal isOpen={openModal} style={customStyles}>
        <div className="heigth">
          <div className="contLogin">
            <button className="close" onClick={closeModal}>
              X
            </button>
            <div className="contInput">
              <span>Create colllection</span>
              <input
                className="input"
                type="text"
                placeholder="insert name"
                value={input}
                onChange={(e) => handleInput(e)}
              />
            </div>
            {
              <button className="buttonPrimary" onClick={() => crear()}>
                ok
              </button>
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}
