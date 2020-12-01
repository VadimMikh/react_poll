import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updatePoll, activatePoll, deactivatePoll } from '../actions/pollActions'
import PollItem from './PollItem'

const Poll = (props) => {
	const userType = useSelector(state => state.user.type)
	const [ selected, setSelected ] = useState(false)
	const [ activePoll, setActivePoll ] = useState(null)
	const dispatch = useDispatch()
	const isAdmin = userType === 'admin'
	const poll = props.poll
	const pollVoted = !!(poll.voted.includes(userType) || (poll.voted.length && userType === 'admin'))
	let totlaVotes = 0
	
	poll.answers.map(answer => {
		totlaVotes += answer.votes
	})

	const answerHandler = (newAnswer, id) => {
	   	const updatedPoll = {
			...poll,
			voted: poll.voted.concat([userType]),
			answers: poll.answers.map(el => {
				if (el.text === newAnswer.text) {
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

		setActivePoll(updatedPoll)
		selectHandler(newAnswer, id)
	}

	const selectHandler = (newAnswer, id) => {
		const updatedPollShort = {
			...poll,
			answers: poll.answers.map(el => {
				if (el.text === newAnswer.text) {
					return {
						...el,
						selected: true
					}
				} else if (el.selected) {
					return {
						...el,
						selected: false
					}
				}
				return el
			})
		}

		setSelected(true)
	 	dispatch(updatePoll(updatedPollShort))
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
				{poll.answers.map((answer) => {
						return <PollItem
							pollId={poll.pollId}
							voted={pollVoted}
							answer={answer}
							answerHandler={answerHandler} 
							totalVotes={totlaVotes} 
							key={answer.id} />
				})}
			</ol>
			<small>{pollVoted && <>Total votes: {totlaVotes}</>}</small>
			{!pollVoted && !isAdmin && selected && <button type="button" className="btn btn-success btn-lg btn-block mt-4" onClick={sendAnswer}>Send</button>}
		</div>
	)
}

export default Poll