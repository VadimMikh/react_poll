import { useState, useEffect } from 'react'
import { useUser } from '../customHooks'
import './PollItem.scss'

const PollItem = (props) => {
    const [ isAdmin ] = useUser()
    const [ percent, setPercent ] = useState(0)
    const { answer, answerHandler, totalVotes, voted, clicked } = props
    const { id, text, votes, selected } = answer
    const percentText = voted ? `${percent}%` : ''

    let styles = {
        width: `${percent}%`
    }

    const answerTrigger = () => {
        if (!voted && !isAdmin) {
            answerHandler({
                id,
                votes: votes + 1
            })
        }
    }

    const a11yPress = e => {
        if (e.charCode === 13) {
            answerTrigger()
        }
    }

    useEffect(() => {
        voted && setPercent(Math.round(votes / totalVotes * 100))
    }, [totalVotes, votes, voted])

    return (
        <li className={`pollitem list-group-item d-flex justify-content-between align-items-center ${selected ? 'pollitem--selected' : ''} ${clicked ? 'pollitem--clicked' : ''}`} 
            onClick={answerTrigger}
            onKeyPress={a11yPress}
            tabIndex="0">
            <span className="pollitem-text">
                {text}
                <strong className="pollitem-percent">{percentText}</strong>
            </span>
            {voted && 
                <>  
                    <span className="badge badge-primary badge-pill">{votes}</span>
                    <div style={styles} className={`pollitem-progress ${selected ? 'pollitem-progress--selected' : ''}`}></div>
                </>
            }
        </li>
    )
}

export default PollItem
