const jwt = require("jsonwebtoken");

function ensureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La petición no tiene la cabecera de autenticación" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    console.log(exp)
    console.log(currentDate)

    if (exp <= currentDate) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

  } catch (error) {
    return res.status(400).send({ msg: "El token no es válido" });
  }
}

module.exports = {
  ensureAuth,
};
