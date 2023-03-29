const Asteroid = require("../models/asteroid");

exports.list = (req, res) => {
    Asteroid.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
}

exports.get = (req, res) => {
    Asteroid.findById(req.params.id)
        .then(asteroid => res.status(200).json(asteroid))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}

exports.create = async (req, res) => {
    Asteroid.create({
        name: req.body.name,
        position: {x: req.body.position.x, y: req.body.position.y},
        minerals: Math.floor(Math.random() * 400 + 800)
    })
        .then(() => res.sendStatus(201))
        .catch(err => {
            return res.status(400).json({error: err})
        })
}
