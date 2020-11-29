import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './PollItem.scss'

const PollItem = (props) => {
    const userType = useSelector(state => state.user.type)
    const [ percent, setPercent ] = useState(0)
    const { answer, answerHandler, totalVotes, voted, pollId } = props
    const { text, votes, selected } = answer
    const percentText = voted ? `${percent}%` : ''

    let styles = {
        width: `${percent}%`
    }

    const answerTrigger = () => {
        if (!voted && userType !== 'admin') {
            answerHandler({
                text,
                votes: votes + 1
            }, pollId)
        }
    }

    useEffect(() => {
        voted && setPercent(Math.round(votes / totalVotes * 100))
        return () => {}
    }, [totalVotes, voted])

    return (
        <li className={`pollitem list-group-item d-flex justify-content-between align-items-center ${selected && 'pollitem--selected'}`} 
            onClick={answerTrigger}>
            <span className="pollitem-text">
                {text}
                <strong className="pollitem-percent">{percentText}</strong>
            </span>
            {voted && 
                <>  
                    <span className="badge badge-primary badge-pill">{votes}</span>
                    <div style={styles} className={`pollitem-progress ${selected && 'pollitem-progress--selected'}`}></div>
                </>
            }
        </li>
    )
}

export default PollItem
