const mongoose = require('mongoose');
const {Schema} = mongoose;
const PointSchema = require("./point");

const asteroidSchema = new Schema({
    minerals: {type: Number, required: true, min: 800, max: 1200},
    remaining_minerals: {type: Number, required: true, min: 0, max: 1200},
    name: {type: String, required: true},
    position: {type: PointSchema, required: true},
    // ["Has Minerals", "Depleted"]
    status: {type: Number, enum: [0, 1], required: true, default: 0}
});

asteroidSchema.statics.getRandomAsteroid = async function () {
    const count = await mongoose.model('asteroids').countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    return await this.model('asteroids').findOne({status: 0}).skip(randomIndex);
}

module.exports = mongoose.model("asteroids", asteroidSchema)
