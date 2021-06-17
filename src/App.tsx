import React from 'react'
import { Users } from './components/Users'
import { Landing } from './components/Landing'
import { Route, Switch } from 'react-router-dom'

const App = () => {
    //...
    return (
        <Switch>
            <Route path="/" component={Users} exact />
            <Route path="/landing" component={Landing} />
        </Switch>
    )
}

export default App
