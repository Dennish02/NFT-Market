import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { crearNFT } from "../../redux/actions/actionNFT";

export default function CrearNFT() {
  const [estado, setEstado] = useState({
    colection: "",
    category: "",
    price: "",
    image: "",
    id: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzkxYTRiOGQ4ZWVjYmQwOGYzZDVlOSIsImlhdCI6MTY1MjE5MTkxOCwiZXhwIjoxNjUyMjc4MzE4fQ.CzOxXPQ1d37NtC3GG8QgznB1OCYvcIQqhfBXpmOWv1g",
  });

  const [errores, setErrores] = useState({
    campos: "",
    errorPrecio: false,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!estado.category || !estado.colection || !estado.price || !estado.image)
      setErrores({ ...errores, error: "Faltan datos" });
    else if (!Number(estado.price)) {
      setErrores({
        ...errores,
        error: "Precio debe ser un numero",
        errorPrecio: true,
      });
    } else {
      setErrores({ ...errores, error: "", errorPrecio: false });
      dispatch(crearNFT(estado));
    }
  };

  return (
    <div className="flex">
      <div className="contLogin">
        <div className="contLogin-content">
          <h3>Crear NFT</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="colection">Colection</label>
            <select onChange={handleChange} name="colection">
              <option selected disabled>
                select
              </option>
              <option value="coleccion 1">coleccion 1</option>
              <option value="coleccion 2">coleccion 2</option>
              <option value="coleccion 3">coleccion 3</option>
            </select>

            <label htmlFor="category">Category</label>
            <select onChange={handleChange} name="category">
              <option selected disabled>
                select
              </option>
              <option value="categoria 1">categoria 1</option>
              <option value="categoria 2">categoria 2</option>
              <option value="categoria 3">categoria 3</option>
            </select>

            <label htmlFor="price">Price</label>
            <input
              className={errores.errorPrecio ? "inputError" : "input"}
              name="price"
              value={estado.price}
              onChange={handleChange}
              id="price"
              type="text"
              placeholder="Enter price"
            ></input>

            <label htmlFor="image">Image</label>
            <input
              name="image"
              value={estado.image}
              onChange={handleChange}
              id="image"
              type="text"
              placeholder="Enter image url"
            ></input>

            {errores.error && <p className="error">{errores.error}</p>}
            <button type="submit" className="buttonPrimary">
              Create NFT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
