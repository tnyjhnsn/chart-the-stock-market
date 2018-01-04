import React from 'react'
import Highcharts from 'highcharts/highstock'
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title,
  LineSeries, Navigator, RangeSelector, Tooltip
} from 'react-jsx-highstock'

const colours = [
  '#6740b4',
  '#2c98f0',
  '#f05830',
  '#febf2e',
  '#50ad55'
]
  
class ChartPanel extends React.Component {

  getSeries(chartData) {
    return chartData.map((data, i) => {
      return (
        <LineSeries
          key={i}
          id={i}
          name={data.symbol}
          step
          color={colours[i]}
          data={data.prices}
        />
      )
    })
  }

  render() {
    const { chartData } = this.props
    return (
      <div className="chart">
        <HighchartsStockChart className="chart-panel">
          <Chart
            zoomType="xy"
            height={600}
            backgroundColor="#adb5bd" />
          <Title>CRYPTOCURRENCY MARKETS</Title>
          <Tooltip />
          <RangeSelector>
            <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
            <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
            <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
            <RangeSelector.Button type="all">All</RangeSelector.Button>
          </RangeSelector>
          <XAxis>
            <XAxis.Title>TIME</XAxis.Title>
          </XAxis>
          <YAxis id="price">
            <YAxis.Title>PRICE</YAxis.Title>
            {this.getSeries(chartData)}
          </YAxis>
          <Navigator>
            <Navigator.Series seriesId="crypto" />
          </Navigator>
        </HighchartsStockChart>
      </div>
    )
  }


}

export default withHighcharts(ChartPanel, Highcharts)
