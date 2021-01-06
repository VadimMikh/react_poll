import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { SnackbarProvider } from 'notistack'
import configureStore from './store'
import App from './App'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const history = createMemoryHistory()
const store = configureStore()
const ReduxProvider = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
)
const wrapper = (children) => (
    <SnackbarProvider>
        <Router history={history}>
            <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
        </Router>
    </SnackbarProvider>
)

describe('App', () => {
    it('renders main heading', () => {
        render(wrapper(<App />))
        const linkElement = screen.getByText(/Poll & QnA PWA/i)
        expect(linkElement).toBeInTheDocument()
    })

    it('navigation in document', () => {
        render(wrapper(<App />))
        const navigation = screen.getByRole('navigation')
        expect(navigation).toBeInTheDocument()
    })

    it('poll page should be opened', () => {
        render(wrapper(<App />))
        const activeLink = screen.getByTestId('pollLink')
        expect(activeLink).toHaveClass('active')
    })

    it('qna page available', () => {
        render(wrapper(<App />))
        const qnaLink = screen.getByTestId('qnaLink')
        userEvent.click(qnaLink)
        expect(qnaLink).toHaveClass('active')
    })
})
