const stateManager = (io, Component) => {
  io.on('market-charts', (action) => {
    switch (action.type) {
      case 'ADD_SYMBOL_SUCCESS': {
        const { chartData } = Component.state
        return Component.setState({
          chartData: [
            ...chartData,
            action.history
          ]
        })
      }
      case 'REMOVE_SYMBOL_SUCCESS': {
        const { chartData } = Component.state
        return Component.setState({
          chartData: [
            ...chartData.filter(data => {
              return data.symbol !== action.symbol
            })
          ]
        })
      }
      case 'MESSAGE': {
        const { message } = action
        return Component.setState({
          message
        })
      }
      default:
        break
    }
  })
}

export default stateManager
