import React, { useEffect, useState } from "react";
import NavWallet from "../componentes/wallet/NavWallet";
import ComponentNFTWallet from "../componentes/wallet/ComponentNFTWallet";
import { useSelector, useDispatch } from "react-redux";
import formateoPrecio from "../middleware/formateoPrecio";

import { allNftMarket} from  "../../redux/actions/actionNFT"
//import MercadoPagoForm from '../componentes/MercadoPago/MercadoPagoForm.jsx'
//import Modal from 'react-modal';
import mp from '../img/mp.png'
import { toast } from 'react-toastify';
import Paginado from './Paginas';
import { comprarCL } from '../../redux/actions/actionUSER';
//import { useNavigate } from 'react-router';
=======
import { allNftMarket } from "../../redux/actions/actionNFT";

import Modal from "react-modal";
import mp from "../img/mp.png";
import { toast } from "react-toastify";
import Paginado from "./Paginas";
import { usuarioActual } from "../../redux/actions/actionUSER";
import { comprarCL } from '../../redux/actions/actionUSER';
import io from "socket.io-client";
let socket;


// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     padding: "0",
//     width: "800px",
//   },
// };



import io from "socket.io-client";
let socket;


function Wallet() {

//const [showModal, setShowModal] = useState(false);
const dispatch = useDispatch()
const usuario = useSelector(state => state.usuario)

const [compra, setCompra] = useState()



//paginacion

const [currentPage, setCurrentPage] = useState(1);
const [transactionByPage, setTransactionByPage] = useState(5);
const indexOfLastTransactions = currentPage * transactionByPage;
const indexOfFirstTransaction = indexOfLastTransactions - transactionByPage;
const currentTransaction = usuario.transacciones.slice(indexOfFirstTransaction, indexOfLastTransactions);
const paginas = (pageNumber) => {
  //console.log(pageNumber);
  setCurrentPage(pageNumber)
}
const goToNextPage = () => setCurrentPage(currentPage + 1);
const goToPreviousPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1)
}
const params = window.location.href;
const [ruta, setRuta ] = useState()


function handleButton(e) {
  e.preventDefault()
  !compra? toast.info('Deebes ingresar in monto') :
  //setShowModal(true);
  localStorage.setItem('valor', `${compra}`)
  dispatch(comprarCL(compra))

}
// function closeModal() {
//   showModal && setShowModal(false);
// }

useEffect(()=> {
  dispatch(allNftMarket())
  socket = io(import.meta.env.VITE_BACKEND_URL);
  socket.emit("Navegar", params);
},[])



useEffect(() => {
  //recibir la respuesta del back
  socket.on("redicreccion", (ruta) => {
    setRuta(ruta);
  });
},[]);


function Wallet() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);

  const [compra, setCompra] = useState();

  //paginacion

  const [currentPage, setCurrentPage] = useState(1);
  const [transactionByPage, setTransactionByPage] = useState(5);
  const indexOfLastTransactions = currentPage * transactionByPage;
  const indexOfFirstTransaction = indexOfLastTransactions - transactionByPage;
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
    dispatch(allNftMarket());
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Navegar", params);
  }, []);
  useEffect(() => {
    //recibir la respuesta del back
    socket.on("redicreccion", (ruta) => {
      setRuta(ruta);
    });
  },[]);

  return (
    <div>
      <NavWallet />
      <div className="ContenedorGeneralWallet">
        <div className="wallet-panel">
          <div className="balanceWallet">
            <h3>your balance:</h3> <h3> {formateoPrecio(usuario.coins)}</h3>
          </div>
          <div>
            <div className="contAgrgarCl">
              <p>Recargá CL con Mercado Pago</p>

             { !ruta ? <> <label htmlFor="monto">Ingreá el monto a comprar</label>
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
               
                
               
               
              </div> </>: <a  href={ruta}> 
                   <button  >
                      <p>Pagar</p>
                      <img   className='logomp' src={mp} />  
                   </button>  </a>}


              <p>Transeferí CL a otro usuario</p>
              <label>Elegir ususario:</label>
              <div className='InpcutLogo'>
                <div className='regalar'>

              {!ruta ? <> <label htmlFor="monto">Ingreá el monto a comprar</label>
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
              <p>Transeferí CL a otro usuario</p>
              <label>Elegir ususario:</label>
              <div className="InpcutLogo">
                <div className="regalar">
                  <input className="input" placeholder="Elegir usuario" />
                </div>
                <div>
                  <button className="buttonPrimary logomp">
                    Buscar y transferir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className='ContenedorCardsWallet'>
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
                )
              })
            ) : (
              <div>No hay transacciones aun</div>
            )
            }
          </div>
          <div >
          <Paginado
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            paginas={paginas}
            currentPage={currentPage}
            allTransaction={usuario.transacciones.length}
            transactionByPage={transactionByPage}
          />
          </div>
         
        </section>
       
        </div>
       
        {/* <Modal  isOpen={showModal} style={customStyles}>
        <MercadoPagoForm compra={compra} closeModal={closeModal} />
        </Modal> */}

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
                allTransaction={usuario.transacciones.length}
                transactionByPage={transactionByPage}
              />
            </div>
          </section>
        ) : null}
      </div>


    </div>
  );
}

export default Wallet;
