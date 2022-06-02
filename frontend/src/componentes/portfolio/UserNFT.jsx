import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit_NFT, venta, Gift_NFT } from "../../../redux/actions/actionNFT";
import Modal from "react-modal";
import Modal2 from "react-modal";
import formateoPrecio from "../../middleware/formateoPrecio";
import { toast } from "react-toastify";

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
  const { usuarios, miUser } = props;
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
      toast.warning("Only numbers");
    } else if (input.length == 0) {
      setInput("");
      toast.warning("Put a value ");
    } else if (input <= 0) {
      setInput("");
      toast.warning("The NFT's price must be greater than 0CL");
    } else {
      dispatch(Edit_NFT(_id, input));
      setOpenModal(false);
    }
  }

  function gift_nft() {
    dispatch(Gift_NFT(idUsuario, id, colection));
    toast.success("NFT given");
    setOpenmodal2(false);
  }

  return (
    <div className="contNFT">
      <div className="venta">
        {avaliable ? (
          <small className="textVenta">For sale</small>
        ) : (
          <small className="textVenta"> Not for sale</small>
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
              <span>Select one user </span>
              <select
                value={idUsuario}
                id="usuarios"
                onChange={(e) => {
                  setIdUsuario(e.target.value);
                }}
              >
                <option value="">-- Select --</option>

                {usuarios.map((user) =>
                  user.id !== miUser._id ? (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ) : null
                )}
              </select>
              <button
                className="buttonPrimary"
                onClick={() => {
                  idUsuario ? gift_nft() : toast.error("must select a user");
                }}
              >
                gift
              </button>
            </div>
          </div>
        </Modal2>
      </div>
    </div>
  );
}
