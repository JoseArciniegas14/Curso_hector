const express = require("express");
const UserController = require("../controllers/user.controller");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/user/me", [md_auth.ensureAuth],  UserController.getMe);
api.get("/user", [md_auth.ensureAuth], UserController.getUsers);
api.post("/user", [md_auth.ensureAuth], UserController.createUser);

module.exports = api;
