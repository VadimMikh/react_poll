import { useState } from 'react'
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
	let totlaVotes = 0
	
	poll.answers.map(answer => {
		totlaVotes += answer.votes
	})

	const answerHandler = (newAnswer, id) => {
	   	const updatedPoll = {
			...poll,
			voted: true,
			pollId: id
		}
		
		updatedPoll.answers.map(el => {
			if (el.text === newAnswer.text) {
				el.votes = newAnswer.votes
				el.selected = true
			} else if (el.selected) {
				el.selected = false
				el.votes = el.votes - 1
			}
		})
		setActivePoll(updatedPoll)
		selectHandler(newAnswer, id)
	}

	const selectHandler = (newAnswer, id) => {
		const updatedPollShort = {
			...poll,
			pollId: id
		}
	 
		updatedPollShort.answers.map(el => {
			if (el.text === newAnswer.text) {
				el.selected = true
			} else if (el.selected) {
				el.selected = false
			}
		})
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
			<ol className={`list-group ${poll.voted && 'poll-voted'}`}>
				{poll.answers.map((answer) => {
						return <PollItem
							pollId={poll.pollId}
							voted={poll.voted}
							answer={answer}
							answerHandler={answerHandler} 
							totalVotes={totlaVotes} 
							key={answer.id} />
				})}
			</ol>
			<small>{poll.voted && <>Total votes: {totlaVotes}</>}</small>
			{!poll.voted && !isAdmin && selected && <button type="button" className="btn btn-success btn-lg btn-block mt-4" onClick={sendAnswer}>Send</button>}
		</div>
	)
}

export default Poll