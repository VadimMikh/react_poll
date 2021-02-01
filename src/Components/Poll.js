import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useUser } from '../customHooks'
import { updatePoll, activatePoll, deactivatePoll } from '../actions/pollActions'
import PollItem from './PollItem'

const Poll = props => {
	const [ isAdmin, userIdent ] = useUser()
	const [ selected, setSelected ] = useState(false)
	const [ activePoll, setActivePoll ] = useState(null)
	const [ selectedID, setSelectedID ] = useState()
	const dispatch = useDispatch()
	const { poll } = props
	const pollVoted = !!(poll.voted.includes(userIdent) || (poll.voted.length && isAdmin))

	const totalVotes = useMemo(() => {
		let totalVotes = 0
		poll.answers.map(answer => {
			totalVotes += answer.votes
		})
		return totalVotes
	}, [poll.answers])

	const answerHandler = newAnswer => {
	   	const updatedPoll = {
			...poll,
			voted: poll.voted.concat([userIdent]),
			answers: poll.answers.map(el => {
				if (el.id === newAnswer.id) {
					return {
						...el,
						votes: newAnswer.votes,
						selected: true
					}
				} else if (el.selected) {
					return {
						...el,
						selected: false,
						votes: el.votes - 1
					}
				}
				return el
			})
		}

		setSelectedID(newAnswer.id)
		setSelected(true)
		setActivePoll(updatedPoll)
	}
	 
	const sendAnswer = () => {
		dispatch(updatePoll(activePoll))
	}
	
	const activatePollHandler = () => {
		dispatch(activatePoll(poll.pollId))
	}

	const deactivatePollHandler = () => {
		dispatch(deactivatePoll(poll.pollId))
	}

	return (
		<div className="mb-4">
			<div className="d-flex p-2 align-items-center">
				<h2>{poll.question}</h2>
				{isAdmin && (poll.active 
					? <button type="button" className="btn btn-danger btn-sm ml-4" onClick={deactivatePollHandler}>Deactivate</button>
					: <button type="button" className="btn btn-success btn-sm ml-4" onClick={activatePollHandler}>Activate</button>
				)}
			</div>
			<ol className={`list-group ${pollVoted ? 'poll-voted' : ''}`}>
				{poll.answers.map(answer => {
					return <PollItem
						voted={isAdmin || pollVoted}
						answer={answer}
						clicked={answer.id === selectedID}
						answerHandler={answerHandler} 
						totalVotes={totalVotes || 0} 
						key={answer.id} 
					/>
				})}
			</ol>
			<small>{pollVoted && <>Total votes: {totalVotes}</>}</small>
			{!pollVoted && !isAdmin && selected && <button type="button" className="btn btn-success btn-lg btn-block mt-4" onClick={sendAnswer}>Send</button>}
		</div>
	)
}

export default Poll