import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"
import { Home, Sukses } from './pages'
import { NavbarComponent } from './components'
class App extends Component {
	render() {
		return (
			<Router>
				<NavbarComponent />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/sukses" component={Sukses} />
				</Switch>
			</Router>
		);
	}
}

export default App;
