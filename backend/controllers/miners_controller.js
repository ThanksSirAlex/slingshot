const Miner = require("../models/miner");
const Planet = require("../models/planet");
const History = require('../models/history')

exports.list = (req, res) => {
    let params = {}
    if (req.query.planet_id !== undefined && req.query.planet_id !== '') {
        params.planet_id = req.query.planet_id
    }
    Miner.find(params)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.get = (req, res) => {
    Miner.findById(req.params.id)
        .then(miner => res.status(200).json(miner))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.update = (req, res) => {
    let update = {}
    // a kind of validator. Do not allow the request to update everything.
    if (req.body.status >= 0) {
        update.status = req.body.status
    }
    Miner.findByIdAndUpdate(req.params.id, update, {runValidators: true})
        .then(miner => res.sendStatus(200))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.delete = (req, res) => {
    Miner.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.create = async (req, res) => {
    let planet = await Planet.findById(req.body.planet_id).exec()
    if (planet === null) {
        return res.status(404).json({error: 'planet not found'})
    }
    Miner.create({
        carry_capacity: req.body.carry_capacity,
        travel_speed: req.body.travel_speed,
        mining_speed: req.body.mining_speed,
        name: req.body.name,
        planet_id: req.body.planet_id,
        position: planet.position
    })
        .then(() => res.sendStatus(201))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.histories = (req, res) => {
    History.find({miner_id: req.params.id}).then(data => res.status(200).json(data))
}
