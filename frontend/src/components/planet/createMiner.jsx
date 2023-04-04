/**
 * Create miner popup
 */

import React from 'react'
import axios from "axios";

class CreateMiner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            carryCapacity: 0,
            travelSpeed: 0,
            miningSpeed: 0,
            totalPoints: 0,
            limit: 120
        }
        this.updatePoints = this.updatePoints.bind(this)
        this.computePoints = this.computePoints.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    computePoints() {
        this.setState({
            totalPoints: this.state.carryCapacity + this.state.travelSpeed + this.state.miningSpeed
        })
    }

    updatePoints(key, value) {
        value = parseInt(value)
        if (value < 1)
            value = 0

        this.setState({
            [key]: value
        }, () => this.computePoints())
    }

    updateName(name) {
        this.setState({
            name: name
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const {carryCapacity, travelSpeed, miningSpeed, name} = this.state;
        axios.post('http://localhost:3000/miners', {
            name: name,
            planet_id: this.props.planet._id,
            carry_capacity: carryCapacity,
            travel_speed: travelSpeed,
            mining_speed: miningSpeed
        })
            .then(response => {
                if(response.status >= 400) {
                    debugger
                }
                alert('Miner created successfully!')
                this.props.closeForm()
                this.props.refreshPlanetList()
            })
            .catch(error => {
                if (error.response) {
                    alert(`Miner created failed! ${error.response.data.error}`);
                }
            })

    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div class="field error">
                <label for="name">Miner name</label>
                <input value={this.state.name} type="text" id="name" placeholder="Miner name"
                       onChange={(e) => this.updateName(e.target.value)}/>
            </div>

            <h2>Assign points</h2>

            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label for="carry-capacity">Carry capacity</label>
                        <input value={this.state.carryCapacity} type="number" id="carry-capacity" placeholder="0"
                               onChange={(e) => this.updatePoints('carryCapacity', e.target.value)}/>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label for="travel-speed">Travel speed</label>
                        <input value={this.state.travelSpeed} type="number" id="travel-speed" placeholder="0"
                               onChange={(e) => this.updatePoints('travelSpeed', e.target.value)}/>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label for="mining-speed">Mining speed</label>
                        <input value={this.state.miningSpeed} type="number" id="mining-speed" placeholder="0"
                               onChange={(e) => this.updatePoints('miningSpeed', e.target.value)}/>
                    </div>
                </div>
            </div>

            <div
                className={this.state.totalPoints <= this.state.limit ? 'green' : 'red'}>{this.state.totalPoints}/{this.state.limit}</div>
            <div className="actions">
                <button>Save</button>
            </div>
        </form>
    }
}

export default CreateMiner
