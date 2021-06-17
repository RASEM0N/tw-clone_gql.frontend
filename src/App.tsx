import React from 'react'
import { Users } from './components/Users'
import { Landing } from './components/Landing'
import { Route, Switch } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { IsAuthenticated } from './components/IsAuthenticated'

const App = () => {
    //...
    return (
        <Switch>
            <Route path="/landing" component={Landing} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <IsAuthenticated>
                <Route path="/users" component={Users} />
            </IsAuthenticated>
        </Switch>
    )
}

export default App
