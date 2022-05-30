import React, {useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { crearColeccion } from "../../../redux/actions/actionColeccion";
import { toast } from "react-toastify";
import { filterColection } from "../../../redux/actions/actionNFT";


const customStyles = {
  overlay: {
    backgroundColor: "rgba(11,12,41,0.48)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    margin: "0",
    backgroundColor: "#3a3a3a",
  },
};

export default function PortfoliOptions() {
  const [coleccion, setColeccion] = useState("");
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");

  const colecciones = useSelector((state) => state.colecciones);

  function showModal() {
    setOpenModal(true);
  }

  function filtrarColeccion(e) {
    setColeccion(e);
    dispatch(filterColection(e));
  }

  function closeModal() {
    setInput("");
    setOpenModal(false);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function crear() {
    if (input.length > 8)
      return toast.error("the name can't have more than 8 characters");
    dispatch(crearColeccion(input));
    closeModal();
  }

  return (
    <div>
      <div className="contButton">
        <div className="center">
          <Link to="/home/usuario/nft/crear/">
            <button className="buttonPrimary">CREATE NFT</button>
          </Link>
        </div>
        <div className="center">
          <button className="buttonOrange" onClick={showModal}>
            CREATE COLECTION
          </button>
        </div>
        <div className="center">
          <Link to="/usuario/favoritos">
            <button className="buttonMorado">MY FAV</button>
          </Link>
        </div>
      </div>
      <div className="contTittle">
        <h2 className="tuPortfolio">Your Portfolio</h2>
        <div>
          <select
            className="coleccion"
            onChange={(e) => filtrarColeccion(e.target.value)}
            value={coleccion}
            id="colection"
          >
            <option value="todos">All</option>
            {colecciones.length !== 0
              ? colecciones.map((el) => (
                  <option key={el._id} value={el.name}>
                    {el.name}
                  </option>
                ))
              : null}
            <option value="comprados">Purchased</option>
          </select>
        </div>
      </div>

      <Modal isOpen={openModal} style={customStyles}>
        <div className="contLogin">
          <button className="close" onClick={closeModal}>
            X
          </button>
          <div className="contInput">
            <span>Create colection</span>
            <input
              className="input"
              type="text"
              placeholder="insert name"
              value={input}
              onChange={(e) => handleInput(e)}
            />
          </div>
          {
            <div className="contButonColection">
                 <button className="buttonColection" onClick={() => crear()}>
                 create
               </button>
            </div>
           
          }
        </div>
      </Modal>
    </div>
  );
}
