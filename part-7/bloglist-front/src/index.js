import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConfigureStore } from './redux/ConfigureStore'
import App from './App'
import './index.css'

const store = ConfigureStore()

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store} >
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'))
