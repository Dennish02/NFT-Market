import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { crearNFT } from "../../redux/actions/actionNFT";

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
  const dispatch = useDispatch();
  const [estado, setEstado] = useState({
    colection: "",
    category: "",
    price: "",
    image: null,
    id: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2MyMTk0Y2IxNTUzOWIwMzAzM2ZkOSIsImlhdCI6MTY1MjMwMjQzOCwiZXhwIjoxNjUyMzg4ODM4fQ.0jv41aQvCdJT5aWq2S5PGw4SfJ2UeC01Geth5kgePlo",
  });

  return (
    <div className="flex">
      <div className="contLogin">
        <div className="contLogin-content">
          <h3>Crear NFT</h3>
          <Formik
            initialValues={estado}
            validate={validate}
            onSubmit={(values) => {
              // console.log(values);
              dispatch(crearNFT(values));
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <label>Coleccion</label>
                <Field name="colection" as="select">
                  <option value="" disabled>
                    -- select --
                  </option>
                  <option value="col1">coleccion 1</option>
                  <option value="col2">coleccion 2</option>
                  <option value="col3">coleccion 3</option>
                </Field>
                <p className="error">
                  <ErrorMessage name="colection" />
                </p>

                <label>Categoria</label>
                <Field name="category" as="select">
                  <option value="" disabled>
                    -- select --
                  </option>
                  <option value="cat1">categoria 1</option>
                  <option value="cat2">categoria 2</option>
                  <option value="cat3">categoria 3</option>
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
                  name="image"
                  type="file"
                  className="file"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
                <p className="error">
                  <ErrorMessage name="image" />
                </p>

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
