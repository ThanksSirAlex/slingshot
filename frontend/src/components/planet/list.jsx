/**
 * List of planets
 */

import React from 'react'
import Rodal from 'rodal'
import PopupContent from './popup.jsx'
import CreateMinerForm from './createMiner.jsx'
import Loader from '../layout/loader.jsx'
import axios from "axios";

class PlanetList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popupVisible: false,
            formVisible: false,
            currentPlanet: {},
            loading: false,
            planets: [],
        }
        this.showPopup = this.showPopup.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)
        this.getPlanets = this.getPlanets.bind(this)
    }

    componentDidMount() {
        this.getPlanets()
    }

    getPlanets() {
        axios.get('http://localhost:3000/planets')
            .then(planets => {
                this.setState({
                    planets: planets.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    // Show planet popup
    showPopup(planet) {
        // If there is a timeout in progress, cancel it
        if (this.state.loaderTimeout)
            clearTimeout(this.state.loaderTimeout)

        this.setState({
            popupVisible: true,
            currentPlanet: planet,
            loading: false,
        })
    }

    // Hide planet popup
    hidePopup() {
        this.setState({
            popupVisible: false,
            currentPlanet: {}
        })
    }

    // Show create miner form popup
    showForm(e, planet) {
        e.stopPropagation()
        this.setState({
            formVisible: true,
            currentPlanet: planet
        })
    }

    // Hide create miner form popup
    hideForm() {
        this.setState({
            formVisible: false,
            currentPlanet: {}
        })
    }

    render() {
        const {loading, planets} = this.state;
        return (
            <div className="list">
                {loading ? (
                    <Loader/>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Miners</th>
                            <th>Minerals</th>
                            <th>Position (x, y)</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {planets.map(planet => (
                            <tr key={planet._id} onClick={() => this.showPopup(planet)}>
                                <td>{planet.name}</td>
                                <td>{planet.miners.length}</td>
                                <td>{planet.minerals}</td>
                                <td>
                                    {planet.position.x}, {planet.position.y}
                                </td>
                                <td>
                                    <div className="icon-addminer" onClick={(e) => this.showForm(e, planet)}>
                                        Create a miner
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                <Rodal visible={this.state.popupVisible} onClose={this.hidePopup} width="550" height="480">
                    <h2>List of miners of {this.state.currentPlanet.name}</h2>
                    {loading ? <Loader/> : <PopupContent miners={this.state.currentPlanet.miners || []}/>}
                </Rodal>

                <Rodal visible={this.state.formVisible} onClose={this.hideForm} width="440" height="480">
                    <h2>Create a miner</h2>
                    <CreateMinerForm planet={this.state.currentPlanet} closeForm={this.hideForm}
                                     refreshPlanetList={this.getPlanets}/>
                </Rodal>
            </div>
        )
    }
}

export default PlanetList
