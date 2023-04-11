const Miner = require("../models/miner");
const Asteroid = require("../models/asteroid");
const Planet = require("../models/planet");
const History = require('../models/history')


exports.loop = async function () {
    const idleMiners = await Miner.find({status: 0}).exec()
    for (const miner of idleMiners) {
        await miner.findClosestAsteroid()
        await miner.save()
    }

    let travellingMiners = await Miner.find({status: 1}).exec()
    for (const miner of travellingMiners) {
        await miner.moveToDestination()
    }

    const miningMiners = await Miner.find({status: 2}).exec()
    for (const miner of miningMiners) {
        await miner.mine()
    }

    const returningMiners = await Miner.find({status: 3}).exec()
    for (const miner of returningMiners) {
        await miner.moveToDestination()
    }
}
