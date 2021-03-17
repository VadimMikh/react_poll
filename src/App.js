import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	NavLink,
	Switch,
	Redirect,
	Route
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useUser } from './customHooks'
import { switchToAdmin, switchToUser } from './actions/userActions'
import PollList from './pages/PollList'
import Qna from './pages/Qna'
import './App.scss'
import { poll } from './websockets.entrypoints'

const App = () => {
	const [ isAdmin ] = useUser()
	const dispatch = useDispatch()

	const {
		sendMessage,
		lastMessage,
		readyState,
	  } = useWebSocket(poll.mainEntryPoint, {
		onOpen: () => {
			console.log('Websockets channel opened on URL ' + poll.mainEntryPoint)
			sendMessage('Initial message')
		},
		shouldReconnect: (closeEvent) => true
	  })

	useEffect(() => {
		lastMessage && console.log(lastMessage.data)
	}, [lastMessage])


	const userHandler = () => {
		const handler = isAdmin ? switchToUser : switchToAdmin
		dispatch(handler())
		sendMessage('User type changed')
	}

	return (
		<Router>
			<div className="container">
				<header className="navigation-header p-2 py-sm-0 d-flex flex-column flex-sm-row justify-content-center align-items-center">
					<h1 className="navigation-title flex-fill">Poll & QnA PWA</h1>
					<button type="button" 
						className="btn btn-info mb-2 mb-sm-0"
						onClick={userHandler}
						data-testid="switchUser">
						{`Switch to ${isAdmin ? 'user' : 'admin'} view`}
					</button>
				</header>
				<nav className="nav nav-pills flex-row navigation-toolbar">
					<NavLink className="flex-fill text-center nav-link" activeClassName="active" to="/poll" data-testid='pollLink'>Poll</NavLink>
					<NavLink className="flex-fill text-center nav-link" activeClassName="active" to="/qna" data-testid='qnaLink'>QnA</NavLink>
				</nav>
			</div>
			<div className="container py-4 d-flex flex-fill">
				<Switch>
					<Route exact path="/">
						<Redirect to="/poll" />
					</Route>
					<Route path="/poll">
						<PollList />
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
