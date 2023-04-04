const Planet = require("../models/planet");
const Miner = require('../models/miner')

exports.list = (req, res) => {
    Planet.aggregate([
        {
            $lookup: {
                from: 'miners',
                localField: '_id',
                foreignField: 'planet',
                as: 'miners'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                position: 1,
                minerals: 1,
                miners: '$miners'
            }
        }
    ])
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
}

exports.get = (req, res) => {
    Planet.findById(req.params.id)
        .then(planet => res.status(200).json(planet))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.create = async (req, res) => {
    Planet.create({
        name: req.body.name,
        position: {x: req.body.position.x, y: req.body.position.y}
    })
        .then(() => res.sendStatus(201))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}
