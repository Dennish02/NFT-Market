import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit_NFT } from '../../../redux/actions/actionNFT'
import Modal from 'react-modal'
import clienteAxios from "../../config/clienteAxios";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0'
  },
};
export default function ComponentNFT(props) {
  const [input, setInput] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { id, image, colection, category, price, creatorId, ownerId, _id } = props;
  const Usuario = useSelector(state => state.usuario)
  function showModal() {
    setOpenModal(true)
  }
  function closeModal() {
    setOpenModal(false)
  }

  function changeInput(e) {
    setInput(e.target.value)
    console.log('input', input)
    if (isNaN(input)) {
      setInput('')
      alert('only numbers')
    }
  }



  return (
    <div className="contNFT">
      <img src={image.url} alt="NFT IMAGE" />
      <div className="contNFTinfo">
        <h2>{`${colection}  ${id}`}</h2>
        <p>{`creator:  ${creatorId}`}</p>
        <p>
          {" "}
          owner: <small> {ownerId}</small>
        </p>
        <p>
          {" "}
          price: <span> {`${price} CL`}</span>{" "}
        </p>
      </div>
      <div className="contButtons">
        <button onClick={showModal} className="w-50 buttonPrimary">EDIT</button>
        <button className="w-50 buttonTrade">GIFT</button>


        <Modal isOpen={openModal}
          style={customStyles}
        >
          <button onClick={closeModal}>CLOSE</button>
          <input type="text" placeholder="insert the new value" value={input} onChange={(e) => changeInput(e)} />

          {
           

            <button onClick={() => dispatch(Edit_NFT(_id, input))}>ok</button>
            
            
            }



        </Modal>
      </div>
    </div>
  );
}
