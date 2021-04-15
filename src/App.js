import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Table from './table.template';
import Add from './add.template';
import Edit from './edit.template';
import 'antd/dist/antd.css';
function App() {
	return (
		<div className='App'>
			{/* <header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'>
					Learn React
				</a>
			</header> */}
			<div className='w-9/12 m-auto '>
				<Router>
					<Switch>
						<Route path='/table'>
							<Table />
						</Route>
						<Route path='/add'>
							<Add />
						</Route>
						<Route path='/edit/:id'>
							<Edit />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
