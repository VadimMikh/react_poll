import {
	BrowserRouter as Router,
	NavLink,
	Switch,
	Redirect,
	Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { switchToAdmin, switchToUser } from './actions/userActions'
import PollList from './pages/PollList'
import Qna from './pages/Qna'

import './App.scss'

function App() {
	const userType = useSelector(state => state.user.type)
	const dispatch = useDispatch()

	const userHandler = () => {
		const handler = userType === 'user' ? switchToAdmin : switchToUser
		dispatch(handler())
	}

	return (
		<Router basename='/react_poll/'>
			<div className="container">
				<header className="navigation-header p-2 py-sm-0 d-flex flex-column flex-sm-row justify-content-center align-items-center">
					<h1 className="navigation-title flex-fill">Poll & QnA PWA</h1>
					<button type="button" 
						className="btn btn-info mb-2 mb-sm-0"
						onClick={userHandler}>
						{`Switch to ${userType === 'admin' ? 'user' : 'admin'}`}
					</button>
				</header>
				<nav className="nav nav-pills flex-row navigation-toolbar">
					<NavLink className="flex-fill text-center nav-link" activeClassName="active" to="/poll">Poll</NavLink>
					<NavLink className="flex-fill text-center nav-link" activeClassName="active" to="/qna">QnA</NavLink>
				</nav>
			</div>
			<div className="container py-4 d-flex flex-fill">
				<Switch>
					<Route exact path="/">
						<Redirect to="/poll" />
					</Route>
					<Route path="/poll">
						<PollList userType={userType} />
					</Route>
					<Route path="/qna">
						<Qna />
					</Route>
					<Route path="*">
						<Redirect to="/poll" />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
