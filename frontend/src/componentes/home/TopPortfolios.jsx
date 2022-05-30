import React from "react";
import perfil from "../../img/profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ComponenteTopPortf from "./ComponenteTopPortf";

export default function TopPortfolios({screen, ranking }) {
  const limite = ranking.slice(0, 3);

  return (
    <section className="contentTopPortfolios">
      <h3 className="TitleTopPortfolios">top user portfolios</h3>

      {limite.length !== 0 ? (
        limite.map((user) => {
          return (
            <div className="contentTopPortfolios--contendio" key={user.nombre}>
              <nav key={user.nombre} className="navTopPortfolio">
                <div className="contImgProfile">
                  <img
                    className="profilePicture"
                    src={user.image.url ? user.image.url : perfil}
                    alt="Profile User"
                  />
                </div>

                <p className="nameUser">{user.nombre}</p>
              </nav>
              <div className="contentSwiper">
                <Swiper
                  slidesPerView={
                    screen > 1650 ? 4 : screen > 1300 ? 3 : screen > 920 ? 2 : 1
                  }
                  spaceBetween={30}
                  navigation
                >
                  {user.nfts.length !== 0 ? (
                    user.nfts?.map((nft, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <ComponenteTopPortf
                            id={nft.id}
                            image={nft.image}
                            colection={nft.colection}
                            priceBase={nft.priceBase}
                            price={nft.price}
                            creatorId={nft.creatorId}
                            ownerId={nft.ownerId}
                            avaliable={nft.avaliable}
                          />
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <p>This user doesn't have nfts</p>
                  )}
                </Swiper>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </section>
  );
}
