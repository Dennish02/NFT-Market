import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { crearNFT, reset } from "../../redux/actions/actionNFT";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { coleccionesUsuario } from "../../redux/actions/actionColeccion";
import { toast } from "react-toastify";

function validate(value) {
  let errores = {};
  !value.colection ? (errores.colection = "required field") : "";
  !value.category ? (errores.category = "required field") : "";
  !value.price
    ? (errores.price = "required field")
    : !Number(value.price)
    ? (errores.price = "must be a number")
    : "";
  !value.image ? (errores.image = "required field") : "";
  return errores;
}
export default function CrearNFT() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  let [validate2, setValidate2] = useState(0);
  const [estado, setEstado] = useState({
    colection: "",
    category: "",
    price: "",
    image: null,
    id: token,
  });

  const navigate = useNavigate();
  const creado = useSelector((state) => state.creado);
  const colecciones = useSelector((state) => state.colecciones);

  useEffect(() => {
    dispatch(coleccionesUsuario());
  }, []);

  useEffect(() => {
    if (creado) {
      dispatch(reset());
      navigate("/home/usuario/portfolio");
    }
  }, [creado]);

  return (
    <div className="flex">
      <div className="contLogin">
        <div className="contLogin-content">
          <h3>Crear NFT</h3>
          <Link to="/home/usuario/portfolio/">
            <button className="close">X</button>
          </Link>
          <Formik
            initialValues={estado}
            validate={validate}
            onSubmit={(values) => {
              dispatch(
                crearNFT({
                  ...values,
                  flag: colecciones.length === 0 ? false : true,
                })
              );
              setValidate2(1);
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                {colecciones.length !== 0 ? (
                  <div>
                    <label>Coleccion</label>
                    <Field name="colection" as="select">
                      <option value="" disabled>
                        -- select --
                      </option>
                      {colecciones?.map((col, i) => (
                        <option key={i} value={col.name}>
                          {col.name}
                        </option>
                      ))}
                    </Field>
                    <p className="error">
                      <ErrorMessage name="colection" />
                    </p>
                  </div>
                ) : (
                  <div>
                    <label>Create colection</label>
                    <Field name="colection" type="text" />
                    <p className="error">
                      <ErrorMessage name="colection" />
                    </p>
                  </div>
                )}

                <label>Category</label>
                <Field name="category" as="select">
                  <option value="" disabled>
                    -- select --
                  </option>
                  <option value="anime">Anime</option>
                  <option value="gamer">Gamer</option>
                  <option value="savage">Savage</option>
                  <option value="cyber">Cyber</option>
                  <option value="punk">Punk</option>
                  <option value="other">Other</option>
                </Field>
                <p className="error">
                  <ErrorMessage name="category" />
                </p>

                <label>Price</label>
                <Field name="price" type="text" />
                <p className="error">
                  <ErrorMessage name="price" />
                </p>

                <label>image</label>
                <input
                  type="file"
                  name="image"
                  className="file"
                  accept="image/*"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
                {validate2 > 0 ? (
                  <button disabled type="submit" className="disableCreate">
                    loading
                  </button>
                ) : (
                  <button type="submit" className="buttonPrimary">
                    Create
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
