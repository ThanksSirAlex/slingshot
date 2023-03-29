const express = require('express');
const minerController =
    require('../controllers/miners_controller.js');
const minersRouter = express.Router();

minersRouter.get("/", minerController.list);
minersRouter.get("/:id", minerController.get);
minersRouter.get("/:id/histories", minerController.histories);

minersRouter.put("/:id", minerController.update)
minersRouter.delete("/:id", minerController.delete)
minersRouter.post('/', minerController.create);


module.exports = minersRouter;
