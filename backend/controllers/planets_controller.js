const Planet = require("../models/planet");

exports.list = (req, res) => {
    Planet.find()
        .then(data => {
            res.status(200).json(data)
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
