# chart-the-stock-market
*FCC full stack challenge to build a market charting app.*

Production version at: http://www.tosp.net.au:3009

This app charts the cryptocurrency markets, and uses the api provided by http://cryptocompare.com. Charts provided by http://highcharts.com and React components for this library by react-jsx-highcharts.

This app uses socket.io to allow for multiple viewers to interact with the site at the same time Each others modifications will be visible to the other parties immediately.

Be aware that if you add the chart for Bitcoin (BTC), most other currencies will appear as a flat line along the bottom of the chart because the price of BTC is so high in comparison. The chart is limited to displaying a total of 5 currencies at any given time.

### General logic
Each time a new currency is requested, 6 months of historical data is retrieved from Cryptocompare.com and stored in the local database. It is also displayed to all connected clients. If the same currency is removed and then requested again during the same online session, it is retrieved from the local database.

When all clients have disconnected for that session, the database entries are deleted.


