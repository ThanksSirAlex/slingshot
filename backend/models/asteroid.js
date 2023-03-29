const mongoose = require('mongoose');
const {Schema} = mongoose;
const PointSchema = require("./point");

const asteroidSchema = new Schema({
    minerals: {type: Number, required: true, min: 800, max: 1200},
    name: {type: String, required: true},
    position: {type: PointSchema, required: true},
    // ["Has Minerals", "Depleted"]
    status: {type: Number, enum: [0, 1], required: true, default: 1}
});

module.exports = mongoose.model("asteroids", asteroidSchema)
