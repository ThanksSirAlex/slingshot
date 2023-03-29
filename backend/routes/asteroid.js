const express = require('express');
const asteroidsController =
    require('../controllers/asteroids_controller');
const asteroidRouter = express.Router();

asteroidRouter.get("/", asteroidsController.list);
asteroidRouter.get("/:id", asteroidsController.get);
asteroidRouter.post('/', asteroidsController.create);


module.exports = asteroidRouter;
