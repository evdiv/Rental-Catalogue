import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserApp from './UserApp'
import AdminApp from './AdminApp'

const App = () =>{
  	return (
    	<BrowserRouter>
			<Switch>
				<Route path='/admin/:path?' exact>
					<AdminApp />
				</Route>
				<Route>
					<UserApp />
				</Route>
			</Switch>
    	</BrowserRouter>
  	)
}

export default App
