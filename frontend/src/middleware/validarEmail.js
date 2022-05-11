export default function validarEmail(string) {
  const regExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  console.log(regExp.exec("asd@asd.com"));
  if (!regExp.exec(string)) {
    return true;
  } else {
    return false;
  }
}
