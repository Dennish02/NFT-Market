import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit_NFT, venta, Gift_NFT } from "../../../redux/actions/actionNFT";
import Modal from "react-modal";
import Modal2 from "react-modal";
import { useNavigate } from "react-router";
import formateoPrecio from "../../middleware/formateoPrecio";
import { toast } from "react-toastify";
import { showUsers } from "../../../redux/actions/actionUSER";

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

export default function ComponentNFT(props) {
  
  const {usuarios, miUser}=props
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenmodal2] = useState(false);
  const [idUsuario, setIdUsuario] = useState("");
  const dispatch = useDispatch();

  const { id, _id, image, colection, avaliable, price, creatorId, ownerId } =
    props;

  function handleSell() {
    dispatch(venta({ _id, avaliable, id }));
  }

  function showModal(type) {
    type === "edit" ? setOpenModal(true) : setOpenmodal2(true);
  }
  function closeModal(type) {
    type === "edit" ? setOpenModal(false) : setOpenmodal2(false);
  }

  function changeInput(e) {
    setInput(e.target.value);
  }

  function editValue() {
    if (isNaN(input)) {
      setInput("");
      toast.warning("only numbers");
    } else if (input.length == 0) {
      toast.warning("put a value ");
    } else {
      dispatch(Edit_NFT(_id, input));
      toast.success("Precio Editado Correctamente");
      setOpenModal(false);
    }
  }

  function gift_nft() {
    dispatch(Gift_NFT(idUsuario, id, colection));
    toast.success("NFT regalado");
    setOpenmodal2(false);
  }

 

  return (
    <div className="contNFT">
      <div className="venta">
        {avaliable ? (
          <small className="textVenta">Quitar del mercado</small>
        ) : (
          <small className="textVenta">Poner en venta</small>
        )}
        <div
          className={avaliable ? "enVenta" : "noVenta"}
          onClick={() => handleSell()}
        ></div>
      </div>
      <div className="contImg">
        <img src={image.url} alt="NFT IMAGE" height="280px" />
      </div>
      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p>
          owner: <small> {ownerId}</small>
        </p>
        <p className="contPrice">
          price: <span> {formateoPrecio(price)}</span>
        </p>
      </div>
      <div className="contButtons">
        <button
          onClick={() => showModal("edit")}
          className="w-50 buttonPrimary"
        >
          EDIT
        </button>

        <button className="w-50 buttonTrade" onClick={() => showModal("gift")}>
          GIFT
        </button>

        <Modal isOpen={openModal} style={customStyles}>
          <div className="heigth">
            <div className="contLogin">
              <button className="close" onClick={() => closeModal("edit")}>
                X
              </button>
              <div className="contInput">
                <span>Update price:</span>
                <input
                  className="input"
                  type="text"
                  placeholder="insert the new value"
                  value={input}
                  onChange={(e) => changeInput(e)}
                />
              </div>
              {
                <button className="buttonPrimary" onClick={() => editValue()}>
                  ok
                </button>
              }
            </div>
          </div>
        </Modal>

        <Modal2 isOpen={openModal2} style={customStyles}>
          <div className="heigth">
            <div className="contLogin">
              <button className="close" onClick={() => closeModal("gift")}>
                X
              </button>
              <span> a quien le queres regalar este nft? </span>
              <select
                value={idUsuario}
                id="usuarios"
                onChange={(e) => {
                  setIdUsuario(e.target.value);
                }}
              >
                <option value="">Seleccione</option>
                {usuarios.map((users) => (
                  <option key={users.id} value={users.id}>
                    {users.name}
                  </option>
                ))}
              </select>
              {idUsuario !== miUser._id ? (
                <button
                  className="buttonPrimary"
                  onClick={() => {
                    idUsuario
                      ? gift_nft()
                      : toast.error("debe seleccionar un usuario");
                  }}
                >
                  OK
                </button>
              ) : (
                <p style={{ color: "red" }}>
                  no podes regalarte un nft a vos mismo!
                </p>
              )}
            </div>
          </div>
        </Modal2>
      </div>
    </div>
  );
}