/**
 * List of asteroids
 */

import React from 'react'
import axios from "axios";

class AsteroidList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            asteroids: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/asteroids')
            .then(res => {
                this.setState({
                    asteroids: res.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return <div className="list">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Minerals</th>
                    <th>Position (x, y)</th>
                </tr>
                </thead>

                <tbody>
                {
                    this.state.asteroids.map(asteroid => (
                        <tr key={asteroid._id}>
                            <td>{asteroid.name}</td>
                            <td>{asteroid.remaining_minerals}/{asteroid.minerals}</td>
                            <td>{asteroid.position.x}, {asteroid.position.y}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    }
}

export default AsteroidList
