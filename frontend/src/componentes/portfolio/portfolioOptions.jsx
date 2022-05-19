import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { crearColeccion } from "../../../redux/actions/actionColeccion";
import { toast } from "react-toastify";

import {filterColection } from '../../../redux/actions/actionNFT'

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
  const [coleccion, setColeccion] = useState(' ')
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");

  const colecciones = useSelector(state => state.backUpNftUser)
  const traerColecciones = colecciones.map(el => el.colection)
  const noRepetirColecciones = new Set(traerColecciones)

 
  function showModal() {
    setOpenModal(true);
  }
  
 function filtrarColeccion()  {
  dispatch(filterColection(coleccion))
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
        <Link to="/usuario/favoritos">
          <button className="buttonMorado">MIS FAVORITOS</button>
        </Link>
      </div>

      <div className="contTittle">
        <h2 className="tuPortfolio">your portfolio</h2>
        <div>
          <select className="coleccion" onChange={(e) => setColeccion(e.target.value)}  value={coleccion} id="colection">
            <option onClick={() => filtrarColeccion()} value="todos">todos</option>
            {[...noRepetirColecciones].map(el => 
               <option onClick={() => filtrarColeccion()} value={el}>{el}</option>
              )}      
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
