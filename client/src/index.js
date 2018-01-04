import React from 'react'
import { render } from 'react-dom'

import 'font-awesome/css/font-awesome.min.css'
import './css/index.css'

import Dashboard from './pages/DashboardContainer'

const renderApp = (Component) => {
  render(
    <Component />,
    document.getElementById('root'))
}

renderApp(Dashboard)
