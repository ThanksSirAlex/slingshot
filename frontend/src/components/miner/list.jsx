/**
 * List of miners
 */

import React from 'react'
import Rodal from 'rodal'
import PopupContent from './popup.jsx'
import Loader from '../layout/loader.jsx'
import axios from "axios";

class MinerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popupVisible: false,
            loading: true,
            miners: [],
            currentMiner: {},
            currentHistories: []
        }
        this.openPopup = this.openPopup.bind(this)
        this.hidePopup = this.hidePopup.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:3000/miners')
            .then(res => {
                this.setState({
                    miners: res.data,
                    loading: false,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    openPopup(miner) {
        this.setState({currentMiner: miner, popupVisible: true})
        axios.get(`http://localhost:3000/miners/${miner._id}/histories`)
            .then(res => {
                this.setState({
                    currentHistories: res.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });

    }

    hidePopup() {
        this.setState({
            popupVisible: false,
            currentMiner: {}
        })
    }

    render() {
        const status = ['Idle', 'Traveling', 'Mining', 'Returning']
        return <div className="list">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Planet</th>
                    <th>Carry capacity</th>
                    <th>Travel speed</th>
                    <th>Mining speed</th>
                    <th>Position (x, y)</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {
                    this.state.miners.map(miner => (
                        <tr key={miner._id} onClick={() => this.openPopup(miner)}>
                            <td>{miner.name}</td>
                            <td>{miner.planet.name}</td>
                            <td>{miner.carried_minerals}/{miner.carry_capacity}</td>
                            <td>{miner.travel_speed}</td>
                            <td>{miner.mining_speed}</td>
                            <td>{miner.position.x}, {miner.position.y}</td>
                            <td>{status[miner.status]}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <Rodal visible={this.state.popupVisible} onClose={this.hidePopup} width="782" height="480">
                <h2>History of {this.state.currentMiner.name}</h2>
                {this.state.loading ? <Loader/> : <PopupContent histories={this.state.currentHistories || []}/>}
            </Rodal>
        </div>
    }
}

export default MinerList
