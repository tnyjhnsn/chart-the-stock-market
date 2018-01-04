import React from 'react'

class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: ''
    }
  }

  handleInputChange = key => event => {
    this.setState({ [key]: event.target.value })
  }

  handleKeyPress = target => {
    if (target.charCode === 13) {
      target.preventDefault()
    }
  }

  addSymbol = event => {
    const { addSymbol } = this.props
    const { symbol } = this.state
    addSymbol(symbol.toUpperCase())
  }

  removeSymbol = symbol => event => {
    const { removeSymbol } = this.props
    removeSymbol(symbol.toUpperCase())
  }

  createSymbolList = () => {
    const { chartData } = this.props
    return chartData.map((data, i) => (
      <div key={i} className="symbol">
        <div className="ml-2">{data.symbol}</div>
        <span
          className="fab"
          onClick={this.removeSymbol(data.symbol)}>
          <i className="fa fa-minus-circle fa-2x text-red" />
        </span>
      </div>
    ))
  }

  render() {
    return (
      <div className="control">
        <form className="form">
          <div className="flex align-center">
            <input
              id="symbol"
              className="input"
              autoComplete="symbol"
              onChange={this.handleInputChange('symbol')}
              onKeyPress={this.handleKeyPress}
              placeholder="Symbol..."
              type="text"
              value={this.state.symbol} />
            <span
              className="fab"
              onClick={this.addSymbol}>
              <i className="fa fa-plus-circle fa-2x text-green-dark" />
            </span>
          </div>
          {this.createSymbolList()}
        </form>
      </div>
    )
  }
}

export default ControlPanel
