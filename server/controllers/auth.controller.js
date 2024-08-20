const bcrypt = require("bcryptjs");
const User = require("../models/user.models");
const jwt = require("../utils/jwt");
const { JWT_SECRET_KEY } = require("../constants");

async function register(req, res) {
  console.log(req.body);

  const { firstname, lastname, email, password } = req.body;

  try {
    // Verifica si la contraseña está presente
    if (!password) {
      return res.status(400).send({ msg: "La contraseña es requerida" });
    }

    // Crea una instancia del usuario
    const user = new User({
      firstname,
      lastname,
      email,
      // Hashea la contraseña antes de guardarla
      password: await bcrypt.hash(password, 10), // 10 es el número de salt rounds
    });

    // Guarda el usuario en la base de datos
    await user.save();

    res.status(200).send({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).send({ msg: "Error al registrar el usuario" });
  }
}

async function login(req, res) {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
  
    try {
      if (!email || !password) {
        return res.status(400).send({ msg: "El email y la contraseña son requeridos" });
      }
  
      const user = await User.findOne({ email: emailLowerCase });
      if (!user) {
        return res.status(404).send({ msg: "El usuario no existe" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Contraseña incorrecta" });
      }
  
      const accessToken = jwt.createAccessToken(user);
      const refreshToken = jwt.createRefreshToken(user);
  
      res.status(200).send({
        msg: "Inicio de sesión exitoso",
        accessToken,
        refreshToken  
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).send({ msg: "Error al iniciar sesión" });
    }
  }
  

module.exports = {
  register,
  login,
};
