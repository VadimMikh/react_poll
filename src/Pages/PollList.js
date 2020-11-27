import { useSelector } from 'react-redux'

import Poll from '../Components/Poll'

const PollList = (props) => {
    const polls = useSelector(state => state.polls.allPolls)
    let isAdmin = props.userType === 'admin'
    let pollsToshow = [];

    if (isAdmin) {
        pollsToshow = polls
    } else {
        pollsToshow = polls.filter(poll => {
            return poll.active === true
        })
    }

    return (
        <div className="flex-fill">
            {pollsToshow.length 
                    ? pollsToshow.map(poll => <Poll poll={poll} key={poll.pollId} />) 
                    : <span>No active polls abailable</span>}
        </div>
    );
}

export default PollList;
