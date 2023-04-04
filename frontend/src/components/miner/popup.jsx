/**
 * Miner popup
 */

import React from 'react'

class MinerPopup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="scrollable">
                <table>
                    <thead>
                    <tr>
                        <th>Desc</th>
                    </tr>
                    </thead>
                    {
                        this.props.histories.map(history => (
                            <tr key={history._id}>
                                <td>{history.desc}</td>
                            </tr>
                        ))
                    }
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default MinerPopup
