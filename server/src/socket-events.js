const market = require('./market')

const connections = {
  number: 0
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    connections.number += 1
    socket.on('market-charts', (action) => {
      switch (action.type) {
        case 'GET_CHART_DATA':
          return market.getChartData(io)
        case 'ADD_SYMBOL':
          return market.addSymbol(io, action.symbol)
        case 'REMOVE_SYMBOL':
          return market.removeSymbol(io, action.symbol)
        default:
          break
      }
      return 'OK'
    })
    socket.on('disconnect', () => {
      connections.number -= 1
      if (!connections.number) {
        market.clearDatabase()
        /* eslint-disable no-console */
        console.log('Temporary database entries removed')
      }
    })
  })
}
