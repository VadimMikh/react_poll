import { useSelector } from 'react-redux'
import { useUser } from '../customHooks'
import Poll from '../components/Poll'

const PollList = () => {
    const polls = useSelector(state => state.polls.allPolls)
    const [ isAdmin ] = useUser()
    const pollsToshow = isAdmin ? polls : polls.filter(poll => poll.active === true)

    return (
        <div className="flex-fill">
            {pollsToshow.length 
                ? pollsToshow.map(poll => <Poll poll={poll} key={poll.pollId} />) 
                : <span>No active polls available</span>}
        </div>
    )
}

export default PollList
