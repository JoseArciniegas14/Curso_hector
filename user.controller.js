
async function getMe(req, res) {
    res.status(200).send({msg: "Usuario encontrado correctamente"})
}

async function register(req, res) {

    const { user_id} = req.user
    const response = await User.findOne({ user_id })

    if (response) {
        return res.status(400).send({ msg: "No se ha encontrado el usuario" });
    } else {
        return res.status(200).send(response);
    }
}

async function getUsers(req, res) {
   res.status(200).send({msg: "Usuarios encontrados correctamente"})
}

module.exports = {
    register,
    getUsers,
    getMe
};
