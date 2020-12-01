import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import configureStore from './store'
import App from './App'

import './index.scss'

ReactDOM.render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </SnackbarProvider>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()