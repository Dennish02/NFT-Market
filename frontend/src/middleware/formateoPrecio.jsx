import icon from "../img/cl.png";

export default function formateoPrecio(number) {
  return (
    <>
      <span className="contIcon">
        {number} <img className="iconcl" src={icon} width="20px" />{" "}
      </span>
    </>
  );
}
