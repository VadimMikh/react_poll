import {
	BrowserRouter as Router,
	NavLink,
	Switch,
	Redirect,
	Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { switchToAdmin, switchToUser } from './actions/userActions'
import './app.scss'
  

function App() {
	const userType = useSelector(state => state.user.type)
	const dispatch = useDispatch()

	const userHandler = () => {
		const handler = userType === 'user' ? switchToAdmin : switchToUser

		dispatch(handler())
	}

	return (
		<Router>
			<header className="navigation-header p-2 py-sm-0 d-flex flex-column flex-sm-row justify-content-center align-items-center">
				<h1 className="navigation-title flex-fill">QnA & Poll App</h1>
				<button type="button" 
					className="btn btn-dark"
					onClick={userHandler}>
					{
						`Switch to ${userType === 'admin' ? 'user' : 'admin'}`
					}
				</button>
			</header>
			<nav className="nav nav-pills flex-row navigation-toolbar">
				<NavLink className="flex-fill text-center nav-link" activeClassName="active" to="/poll">Poll</NavLink>
				<NavLink className="flex-fill text-center nav-link" activeClassName="active" to="/qna">QnA</NavLink>
			</nav>
			<div className="container py-4">
				<Switch>
					<Route exact path="/">
						<Redirect to="/poll" />
					</Route>
					<Route exact path="/poll">
						Poll
					</Route>
					<Route exact path="/qna">
						QnA
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
