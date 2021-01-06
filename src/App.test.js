import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './App'

const ReduxProvider = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
)
const store = configureStore()
const wrapper = (children) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
)

describe('App', () => 
    it('renders main heading', () => {
        render(wrapper(<App />))
        const linkElement = screen.getByText(/Poll & QnA PWA/i)
        expect(linkElement).toBeInTheDocument()
    })
)