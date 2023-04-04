const mongoose = require('mongoose');
const {Schema} = mongoose;
const PointSchema = require("./point");

const planetSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    position: {type: PointSchema, required: true},
    minerals: {type: Number, required: true, min: 0, default: 0},
    miners: [{ type: Schema.Types.ObjectId, ref: 'miners' }]
});

module.exports = mongoose.model("planets", planetSchema)
