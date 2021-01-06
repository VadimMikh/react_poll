import { render, screen } from '@testing-library/react'
import { snackWrapper } from '../helpers'
import Qna from './Qna'

describe('Qna', () => {
    it('check for inactive input', () => {
        render(snackWrapper(<Qna />))
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('readOnly')
    })
})