const express = require('express');
const planetController =
    require('../controllers/planets_controller');
const planetRouter = express.Router();

planetRouter.get("/", planetController.list);
planetRouter.get("/:id", planetController.get);
planetRouter.post('/', planetController.create);


module.exports = planetRouter;
