import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  seeOffers,
  responseOffer,
  cancelOffer,
  deleteOffer,
} from "../../redux/actions/actionNFT";
import CardTrade from "../componentes/trades/CardTrade";
import NavBar from "../componentes/home/NavBar";
import { usuarioActual } from "../../redux/actions/actionUSER";
import NotificationModal from "../componentes/home/NotificationModal";
import io from "socket.io-client";

let socket;

function Trades() {
  const dispatch = useDispatch();
  const AllTrades = useSelector((state) => state.trades);
  const usuarioAct = useSelector((state) => state.usuarioActual);
  const params = window.location.href;

  useEffect(() => {
    dispatch(seeOffers());
    dispatch(usuarioActual());
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Trades", params);
  }, []);

  useEffect(() => {
    socket.on("update5", () => {
      dispatch(seeOffers());
    });
  }, []);

  const response = false;

  const handleCancel = (e) => {
    dispatch(cancelOffer({ id: e }));
  };

  const handleAccept = (e) => {
    dispatch(responseOffer({ response: true, newId: e }));
  };

  const handleReject = (e) => {
    dispatch(responseOffer({ response, newId: e }));
  };

  const handleDelete = (e) => {
    dispatch(deleteOffer({ id: e }));
  };


  return (
    usuarioAct.length !== 0 ?
    <div>
      <NavBar usuario={usuarioAct} />
      <NotificationModal usuario={usuarioAct} />
      <div className="contenedorCard">
        {!AllTrades.msg ? (
          AllTrades?.map((e, i) => {
            return (
              <div key={i} className="contTrades">
                <h3> This user {e.userA} sent you this offer</h3>
                <div className="contTrades-cards" key={e.id}>
                  <div>
                    <CardTrade
                      id={e.nftA.id}
                      creatorId={e.nftA.creatorId}
                      image={e.nftA.image.url}
                      colection={e.nftA.colection}
                      price={e.nftA.price}
                      ranking={e.nftA.ranking}
                    />
                  </div>
                  <div className="contTrades-flechas">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-arrow-big-left"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="#f28b12"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-arrow-big-right"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="#f28b12"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
                    </svg>
                  </div>
                  <div>
                    <CardTrade
                      id={e.nftB.id}
                      creatorId={e.nftB.creatorId}
                      image={e.nftB.image.url}
                      colection={e.nftB.colection}
                      price={e.nftB.price}
                      ranking={e.nftB.ranking}
                    />
                  </div>
                </div>
                {e.userB === usuarioAct.nombre ? (
                  <div className="contButtonTrade">
                    <button
                      onClick={() => handleAccept(e._id)}
                      className="buttonPrimary"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(e._id)}
                      className="buttonRojos"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="contButtonTrade">
                    {e.condition === "pending" && (
                      <button
                        onClick={() => handleCancel(e._id)}
                        className="buttonRojos"
                      >
                        Cancel
                      </button>
                    )}
                    {e.condition === "accepted" && (
                      <div>
                        {" "}
                        <p className="Disponible">
                          this offer is accepted
                        </p>{" "}
                      </div>
                    )}
                    {e.condition === "rejected" && (
                      <div className="center">
                        {" "}
                        <button
                          onClick={() => handleDelete(e._id)}
                          className="buttonRojos"
                        >
                          delete
                        </button>
                        <p className="noDisponible">This offer was rejected</p>{" "}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>
            <p className="MensajeVacios">{AllTrades.msg}</p>
          </div>
        )}
      </div>
    </div> : <p className="MensajeVacios">Loading</p>
  );
}

export default Trades;
