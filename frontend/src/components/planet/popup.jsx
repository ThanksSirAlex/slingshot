/**
 * Planet popup
 */

import React from 'react'

class PlanetPopup extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="scrollable">
				<table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Carry capacity</th>
						<th>Travel speed</th>
						<th>Mining speed</th>
						<th>Position (x, y)</th>
						<th>Status</th>
					</tr>
					</thead>

					<tbody>
					{
						this.props.miners.map(miner => (
						<tr key={miner.id}>
							<td>{miner.name}</td>
							<td>{miner.carried_minerals}/{miner.carry_capacity}</td>
							<td>{miner.travel_speed}</td>
							<td>{miner.mining_speed}</td>
							<td>{miner.position.x}, {miner.position.y}</td>
							<td>{miner.status}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		)
	}
}

export default PlanetPopup
