import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { crearNFT, reset } from "../../redux/actions/actionNFT";
import { useNavigate } from "react-router";
import { coleccionesUsuario } from "../../redux/actions/actionColeccion";

function validate(value) {
  let errores = {};
  !value.colection ? (errores.colection = "Campo obligatorio") : "";
  !value.category ? (errores.category = "Campo obligatorio") : "";
  !value.price
    ? (errores.price = "Campo obligatorio")
    : !Number(value.price)
    ? (errores.price = "Debe ser un numero")
    : "";
  !value.image ? (errores.image = "Campo obligatorio") : "";
  return errores;
}
export default function CrearNFT() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
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
                    <label>Crear coleccion</label>
                    <Field name="colection" type="text" />
                    <p className="error">
                      <ErrorMessage name="colection" />
                    </p>
                  </div>
                )}

                <label>Categoria</label>
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

                <label>Precio</label>
                <Field name="price" type="text" />
                <p className="error">
                  <ErrorMessage name="price" />
                </p>

                <label>Imagen</label>
                <input
                  type="file"
                  name="image"
                  className="file"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />

                <button type="submit" className="buttonPrimary">
                  Crear
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
