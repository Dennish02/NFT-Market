import React, { useEffect, useState } from "react";
import NavWallet from "../componentes/wallet/NavWallet";
import ComponentNFTWallet from "../componentes/wallet/ComponentNFTWallet";
import { useSelector, useDispatch } from "react-redux";
import formateoPrecio from "../middleware/formateoPrecio";

import { allNftMarket} from  "../../redux/actions/actionNFT"

import Modal from "react-modal";
import mp from "../img/mp.png";
import { toast } from "react-toastify";
import Paginado from "./Paginas";
import { usuarioActual , transferirCL, showUsers} from "../../redux/actions/actionUSER";
import { comprarCL } from '../../redux/actions/actionUSER';
import io from "socket.io-client";



let socket;

function Wallet() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuarioActual);
  const [compra, setCompra] = useState();
  const [errors, setErrors] = useState({
    clerror:"",
    error:""
  })
  const [ mostrarModal, setMostrarModal ] = useState(false)
  const [transferencias, setTransferencias] = useState({
    cl:"",
    user:"",
  })

  //paginacion

  const [currentPage, setCurrentPage] = useState(1);

  const [transactionByPage, setTransactionByPage] = useState(5);



  const [elementsByPage, setElementsByPage] = useState(5);
  const indexOfLastTransactions = currentPage * elementsByPage;
  const indexOfFirstTransaction = indexOfLastTransactions - elementsByPage;

  let currentTransaction;
  if (usuario.length !== 0) {
    currentTransaction = usuario.transacciones.slice(
      indexOfFirstTransaction,
      indexOfLastTransactions
    );
  } else {
    currentTransaction = [];
  }

  useEffect(() => {
    dispatch(usuarioActual());
  }, []);

  const paginas = (pageNumber) => {
    //console.log(pageNumber);
    setCurrentPage(pageNumber);
  };
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const [ruta, setRuta ] = useState()
  const params = window.location.href;

  function handleButton(e) {
    e.preventDefault()
    !compra ? toast.info("Deebes ingresar in monto") :  
    localStorage.setItem('valor', `${compra}`)
    dispatch(comprarCL(compra));
  }
  function closeModal() {
    showModal && setShowModal(false);
  }

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Navegar", params);
  }, []);
  useEffect(() => {
    //recibir la respuesta del back
    socket.on("redicreccion", (ruta) => {
      setRuta(ruta);
    });
    socket.on("TransferenciaOk", () => {
      dispatch(usuarioActual())
    })
  });

  function MostrarModal () {
    setMostrarModal(true);
  } 
  function OcultarModal () {
    setMostrarModal(false);
    setErrors({})
    setTransferencias({
      cl:"",
      user:"",
    })
  } 

  const handleChangeInputTransfer = (e) => {
    setTransferencias({
      ...transferencias.user,
      [e.target.name]: e.target.value
    })
    if(e.target.value.length > 10){
      setErrors({
        error: "Invalid length"
      })
    }else {
      setErrors({
        error: ""
      })
    }
    console.log(transferencias)
  }

  const handleInputCl = (e) => {
    setTransferencias({
      ...transferencias,
      [e.target.name]: e.target.value
    })
    if(e.target.value < 0 ){
      setErrors({
        clerror: "Enter a number greater than 1"
      })
    }else if (!e.target.value){
      setErrors({
        clerror:""
      })
    }
    console.log(e.target.value)
  }

  const handleSubmitTransfer = (e) => {
    e.preventDefault()
    dispatch(transferirCL(transferencias))
    setMostrarModal(false)
    setTransferencias({
        cl:"",
        user:"",
      })
    setErrors({})
  }

  

  return (
    <div className="contentHome" >
      <NavWallet />
      <div className="ContenedorGeneralWallet">
        <div className="wallet-panel">
          <div className='balanceWallet'>
            <h3>your balance:</h3> <h3> {formateoPrecio(usuario.coins)}</h3>
          </div>
          <div>
            <div className='contAgrgarCl'>

              <p>Recargá CL con Mercado Pago</p>
              {!ruta ? <> <label htmlFor="monto">Enter the amount to deposit</label>
                <div className='InpcutLogo'>
                  <div className='contInput'>

                    <input
                      id='valorMP'
                      placeholder='Ingresa la cantidad de CL'
                      onChange={(e) => setCompra(e.target.value)}
                      className='dinner input'
                      value={compra} />
                  </div>

                  <button className='buttonMorado' onClick={handleButton}>Enviar</button>


                </div> </> : <a href={ruta}>
                <button  >
                  <p>Pagar</p>
                  <img className='logomp' src={mp} />
                </button>  </a>
              }


              <p>Transferí CL a otro usuario</p>
              <button className="buttonPrimary" onClick={MostrarModal}>Transferir</button>
              <Modal isOpen={mostrarModal}>
              <div className='InpcutLogo'>
                <div className='regalar'>
                <button className="close" onClick={OcultarModal}>
                    X
                </button>
                <form onSubmit={handleSubmitTransfer}>
                    <input
                    className= "input"
                    name="user"
                    type="text"
                    placeholder='insert user'
                    onChange={handleChangeInputTransfer}
                    value={transferencias.user}
                    />
                    {errors.error && (
                      <div>
                        <p className="error">{errors.error}</p>
                      </div>
                    )}
                    
                    <input 
                    min="1"
                    pattern="[0-9]+"
                    className= "input"
                    name="cl"
                    type="number"
                    placeholder="insert coins"
                    value={transferencias.cl}
                    onChange={handleInputCl}
                    />
                      {errors.clerror && (
                      <div>
                        <p className="error">{errors.clerror}</p>
                      </div>
                    )}
                    
                    <button className="buttonPrimary" type="submit">Submit Coins</button>
                </form>
                </div>
              </div>
              </Modal>
            </div>
          </div>
        </div>

        {usuario.length !== 0 ? (
          <section>
            <div className="ContenedorCardsWallet">
              {currentTransaction.length !== 0 ? (
                currentTransaction?.map((nft, index) => {
                  return (
                    <div key={index}>
                      {
                        <ComponentNFTWallet
                          NFT_colection={nft.NFT_colection}
                          NFT_id={nft.NFT_id}
                          actual_owner_Id={nft.actual_owner_Id}
                          createdAt={nft.createdAt}
                          price={nft.price}
                          seller_Id={nft.seller_Id}
                          transactionType={nft.transactionType}
                          updatedAt={nft.updatedAt}
                          __v={nft.__v}
                          _id={nft._id}
                        />
                      }
                    </div>
                  );
                })
              ) : (
                <div>No hay transacciones aun</div>
              )}
            </div>
            <div>
              <Paginado
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                paginas={paginas}
                currentPage={currentPage}
                allElemnts={usuario.transacciones.length}
                elementsByPage={elementsByPage}
              />
            </div>
          </section>
        ) : null}
      </div>


    </div>
  );
}

export default Wallet;
