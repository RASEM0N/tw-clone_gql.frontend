import React from 'react'
import { Users } from './components/Users'
import { Landing } from './components/Landing'
import { Route, Switch } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'

const App = () => {
    //...
    return (
        <Switch>
            <Route path="/" component={Users} exact />
            <Route path="/landing" component={Landing} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
        </Switch>
    )
}

export default App
