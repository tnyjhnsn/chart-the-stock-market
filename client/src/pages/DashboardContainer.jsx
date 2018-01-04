import React from 'react'
import socket from 'socket.io-client'

import stateManager from './state-mananger'
import ChartPanel from './ChartPanel'
import ControlPanel from './ControlPanel'

const io = socket.connect('http://www.tosp.net.au:3009')

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)
    stateManager(io, this)
    this.state = {
      message: '',
      chartData: []
    }
  }

  componentWillMount() {
    io.emit('market-charts', { type: 'GET_CHART_DATA' })
  }

  addSymbol = symbol => {
    io.emit('market-charts', { type: 'ADD_SYMBOL', symbol })
  }

  removeSymbol = symbol => {
    io.emit('market-charts', { type: 'REMOVE_SYMBOL', symbol })
  }

  render() {
    const { chartData } =  this.state
    return (
      <div className="dashboard">
        <ChartPanel chartData={chartData} />
        <ControlPanel
          addSymbol={this.addSymbol}
          removeSymbol={this.removeSymbol}
          chartData={chartData} />
      </div>
    ) 
  }
}

export default DashboardContainer
