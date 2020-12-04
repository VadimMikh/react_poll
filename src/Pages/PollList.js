import { useSelector } from 'react-redux'

import Poll from '../components/Poll'

const PollList = (props) => {
    const polls = useSelector(state => state.polls.allPolls)
    const pollsToshow = props.userType === 'admin' ? polls : polls.filter(poll => poll.active === true)

    return (
        <div className="flex-fill">
            {pollsToshow.length 
                ? pollsToshow.map(poll => <Poll poll={poll} key={poll.pollId} />) 
                : <span>No active polls abailable</span>}
        </div>
    )
}

export default PollList
