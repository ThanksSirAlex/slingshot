const mongoose = require('mongoose');
const {Schema} = mongoose;
const PointSchema = require("./point");
const Asteroid = require('./asteroid')
const Planet = require('./planet')
const History = require('./history')

const minerSchema = new Schema({
    carry_capacity: {type: Number, required: true, min: 1, max: 200},
    travel_speed: {type: Number, required: true, min: 1, max: 200},
    mining_speed: {type: Number, required: true, min: 1, max: 200},
    carried_minerals: {type: Number, required: true, min: 0, default: 0},
    name: {type: String, required: true},
    planet: {type: Schema.Types.ObjectId, ref: 'planets', required: true},
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

minerSchema.methods.distanceToDestination = function () {
    if (!this.destination) {
        throw new Error('current miners does not have a destination');
    }
    let dx = this.destination.x - this.position.x;
    let dy = this.destination.y - this.position.y;
    return Math.sqrt(dx * dx + dy * dy);
}

minerSchema.methods.moveToDestination = async function () {
    let distance = this.distanceToDestination();
    if (distance <= this.travel_speed) {
        this.position = this.destination;
        if (this.status === 1) {
            // starting mining
            this.status = 2
            const asteroid = await Asteroid.findOne({position: this.position}).exec();
            asteroid.status = 0
            await History.create({desc: `arrive in ${asteroid.name}, begin to mine`, miner_id: this.id});
            await asteroid.save()
        } else if (this.status === 3) {
            // discharge
            const planet = await Planet.findById(this.planet).exec()
            planet.minerals += this.carried_minerals
            await planet.save()
            await History.create({desc: `arrive in ${planet.name}, discharging`, miner_id: this.id});
            this.carried_minerals = 0
            this.status = 0
        }
    } else {
        let dx = (this.destination.x - this.position.x) * (this.travel_speed / distance);
        let dy = (this.destination.y - this.position.y) * (this.travel_speed / distance);
        this.position.x = Number((this.position.x + dx).toFixed(2));
        this.position.y = Number((this.position.y + dy).toFixed(2));
        await History.create({desc: `travelling to ${this.destination}`, miner_id: this.id});
    }
    return this.save();
}

minerSchema.methods.setDestination = async function () {
    const randomAsteroid = await Asteroid.getRandomAsteroid();
    this.destination = randomAsteroid.position;
    this.status = 1;
    await History.create({desc: `start travel to ${randomAsteroid.name}`, miner_id: this.id});
    await this.save();
}

minerSchema.methods.mine = async function () {
    if (this.status !== 2) {
        throw new Error("Miner is not mining");
    }

    const asteroid = await Asteroid.findOne({position: this.position}).exec();
    if (!asteroid) {
        throw new Error("Asteroid not found");
    }

    const minedMinerals = Math.min(this.mining_speed, asteroid.remaining_minerals, this.carry_capacity - this.carried_minerals);
    asteroid.remaining_minerals -= minedMinerals;
    if (asteroid.remaining_minerals <= 0) {
        asteroid.remaining_minerals = 0
        asteroid.status = 1
        const planet = await Planet.findById(this.planet).exec()
        this.status = 3
        this.destination = planet.position
    }

    this.carried_minerals += minedMinerals
    if (this.carried_minerals >= this.carry_capacity) {
        const planet = await Planet.findById(this.planet).exec()
        this.status = 3
        this.destination = planet.position
    }
    await asteroid.save();
    await this.save();
}

module.exports = mongoose.model("miners", minerSchema)
