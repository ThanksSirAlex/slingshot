const mongoose = require('mongoose');
const {Schema} = mongoose;

const historySchema = new Schema({
    miner_id: {type: String, require: true},
    desc: {type: String, require: true}
});

module.exports = mongoose.model("histories", historySchema)
