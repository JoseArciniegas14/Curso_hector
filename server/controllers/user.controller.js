const User = require("../models/user.model");

async function getMe(req, res) {
  const { user_id } = req.user;
  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).sed({ msg: "No se ha encontrado el usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  resizeTo.status(200).send(response);
}

async function createUser(req, res) {
  console.log(req.body);
  res.status(200).send({ msg: "Funciona!" });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
};
