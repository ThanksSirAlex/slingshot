const mongoose = require('mongoose');
const {Schema} = mongoose;
const PointSchema = require("./point");

const minerSchema = new Schema({
    carry_capacity: {type: Number, required: true, min: 1, max: 200},
    travel_speed: {type: Number, required: true, min: 1, max: 200},
    mining_speed: {type: Number, required: true, min: 1, max: 200},
    carried_minerals: {type: Number, required: true, min: 0, default: 0},
    name: {type: String, required: true},
    planet_id: {type: String, required: true},
    position: {type: PointSchema, required: true},
    destination: {type: PointSchema},
    status: {
        type: Number,
        // ["Idle", "Traveling", "Mining", "Transferring minerals to planet"]
        enum: [0, 1, 2, 3],
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("miners", minerSchema)
