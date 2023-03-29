const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
    x: {type: Number, require: true, min: 0, max: 999},
    y: {type: Number, require: true, min: 0, max: 999}
});
