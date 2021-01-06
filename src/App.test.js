import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { snackReduxWrapper } from './helpers'
import App from './App'

describe('App', () => {
    it('renders main heading', () => {
        render(snackReduxWrapper(<App />))
        const linkElement = screen.getByText(/Poll & QnA PWA/i)
        expect(linkElement).toBeInTheDocument()
    })

    it('navigation in document', () => {
        render(snackReduxWrapper(<App />))
        const navigation = screen.getByRole('navigation')
        expect(navigation).toBeInTheDocument()
    })

    it('poll page should be opened', () => {
        render(snackReduxWrapper(<App />))
        const activeLink = screen.getByTestId('pollLink')
        expect(activeLink).toHaveClass('active')
    })

    it('qna page available', () => {
        render(snackReduxWrapper(<App />))
        const qnaLink = screen.getByTestId('qnaLink')
        userEvent.click(qnaLink)
        expect(qnaLink).toHaveClass('active')
    })
})
