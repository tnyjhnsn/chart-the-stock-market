const axios = require('axios')
const History = require('./model/history')

const symbolsInUse = []

module.exports = {
  getChartData(io) {
    symbolsInUse.forEach(async (symbol) => {
      const query = History.findOne({ symbol })
      const history = await query.exec()
      if (history) {
        io.emit('market-charts', { type: 'ADD_SYMBOL_SUCCESS', history })
      }
    })
  },

  async addSymbol(io, symbol) {
    if (symbolsInUse.includes(symbol)) {
      return 'Already In Use'
    }
    if (symbolsInUse.length === 5) {
      return io.emit(
        'market-charts',
        { type: 'MESSAGE', message: 'Limit of 5 currencies per chart' }
      )
    }
    const query = History.findOne({ symbol })
    let history = await query.exec()
    if (history) {
      return io.emit('market-charts', { type: 'ADD_SYMBOL_SUCCESS', history })
    }
    history = await axios({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=180`,
      method: 'get'
    })
    const prices = Object.entries(history.data.Data).map((day) => {
      const { time, close } = day[1]
      return [time * 1000, close]
    })
    History.create({ symbol, prices })
    symbolsInUse.push(symbol)
    return io.emit('market-charts', { type: 'ADD_SYMBOL_SUCCESS', history: { symbol, prices } })
  },

  async removeSymbol(io, symbol) {
    const index = symbolsInUse.indexOf(symbol)
    symbolsInUse.splice(index, 1)
    return io.emit('market-charts', { type: 'REMOVE_SYMBOL_SUCCESS', symbol })
  },

  async clearDatabase() {
    symbolsInUse.length = 0
    await History.remove({})
  }
}
