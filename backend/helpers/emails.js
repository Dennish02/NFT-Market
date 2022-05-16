import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  //   //dennis
  //   var transport = nodemailer.createTransport({
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "bd939024e7b851",
  //     pass: "bd66a92987b5ce"
  //   }
  // });

  //pablo
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bd939024e7b851",
      pass: "bd66a92987b5ce",
    },
  });

  //INFORMACION EMAIL

  const info = await transport.sendMail({
    from: '"NFT Market" <cuentas@nftmarket.com>',
    to: email,
    subject: "NFT Market - Confirma tu Cuenta",
    text: "Comprueba tu cuenta en NFT Market",
    html: `
        <p>Hola: ${nombre} haz click en el enlace para verificar tu cuenta</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comporbar Cuenta</a>
        <p>Si no fuiste vos quien creó la cuenta podes ignorar este email</p>
            `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //INFORMACION EMAIL
  const info = await transport.sendMail({
    from: '"NFT Market" <cuentas@nftmarket.com>',
    to: email,
    subject: "NFT Market - REESTABLECE TU PASSWORD",
    text: "Restablece la contraseña de tu cuenta en NFT Market",
    html: `
        <p>Hola: ${nombre} haz click en el enlace para ingresar una nueva contraseña</p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> CAMBIAR PASSWORD </a>
        <p>Si no fuiste vos quien creó la cuenta podes ignorar este email</p>
            `,
  });
};
