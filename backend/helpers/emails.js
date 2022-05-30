import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  //Pollo
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //INFORMACION EMAIL

  const info = await transport.sendMail({
    from: '"NFT Market" <cuentas@nftmarket.com>',
    to: email,
    subject: "NFT Market - Confirm your account",
    text: "Confirm your NFT Market Account",
    html: `
        <h3>Hi ${nombre} please follow the link below to confirm your account</h3>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"><h4>Confirm Account</h4></a>
        <p>If you have not created this account, please skip this mail</p>
            `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //INFORMACION EMAIL
  const info = await transport.sendMail({
    from: '"NFT Market" <cuentas@nftmarket.com>',
    to: email,
    subject: "NFT Market - Reset your password",
    text: "Restablece la contraseña de tu cuenta en NFT Market",
    html: `
        <p>Hola: ${nombre} haz click en el enlace para ingresar una nueva contraseña</p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> CAMBIAR PASSWORD </a>
        <p>Si no fuiste vos quien creó la cuenta podes ignorar este email</p>
            `,
  });
};

export const soldNFT = async (data) => {
  const { email, seller, buyer, nft, price } = data;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"NFT Market" <cuentas@nftmarket.com>',
    to: email,
    subject: "NFT Market - Your NFT has been sold",
    text: "Your NFT has been sold",
    html: `
    <h3>Hi ${seller} your NFT ${nft} has been purchased by ${buyer} for ${price}CryptoLies</h3>
    <small>(This is just an informative email)</small>
    `,
  });
};
export const boughtdNFT = async (data) => {
  const { email, buyer, nft, price } = data;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"NFT Market" <cuentas@nftmarket.com>',
    to: email,
    subject: "NFT Market - You bought an NFT",
    text: "Your NFT has been sold",
    html: `
    <h3>Hi ${buyer}, congratulations, you just bought this NFT ${nft} at ${price} CryptoLies</h3>
    <small>(This is just an informative email)</small>
    `,
  });
};

export const forSale = async (data) => {
  const { email, user, nft, price, sale } = data;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  if (sale) {
    const info = await transport.sendMail({
      from: '"NFT Market" <cuentas@nftmarket.com>',
      to: email,
      subject: "NFT Market - Your NFT is now for sale",
      text: "Your NFT is now for sale",
      html: `
        <h3>Hi ${user} your NFT ${nft} is now for sale for ${price} CryptoLies</h3>
        <p>You can remove it from the sale at any time</p>
        <small>(This is just an informative email)</small>
      `,
    });
  } else {
    const info = await transport.sendMail({
      from: '"NFT Market" <cuentas@nftmarket.com>',
      to: email,
      subject: "NFT Market - Your NFT is no longer for sale",
      text: "Your NFT is no longer for sale",
      html: `
        <h3>Hi ${user} your NFT ${nft} is no longer for sale</h3>
        <small>(This is just an informative email)</small>
      `,
    });
  }
};

export const giftNFT = async (data) => {
  const { email, from, to, nft } = data;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"NFT Market" <cuentas@nftmarket.com>',
    to: email,
    subject: "NFT Market - You have received a gift",
    text: "You have received a gift",
    html: `
    <p>Hi ${to}, congratulations, you received the NFT <span style="font-weight: bold;">${nft}</span> as a gift from ${from}</p>
    <p>go to </p>
    <h3><a href="${process.env.FRONTEND_URL}">NFT Market</a></h3>
    `,
  });
};
