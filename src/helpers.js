import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { SnackbarProvider } from 'notistack'
import configureStore from './store'

const history = createMemoryHistory()
const store = configureStore()
const ReduxProvider = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
)

export const snackWrapper = (children) => (
    <SnackbarProvider>
        <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
    </SnackbarProvider>
)

export const snackReduxWrapper = (children) => (
    <SnackbarProvider>
        <Router history={history}>
            <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
        </Router>
    </SnackbarProvider>
)