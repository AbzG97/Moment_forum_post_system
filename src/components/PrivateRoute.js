import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useAuth} from '../AuthContext'

function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth();
    return (
        <Route {...rest} render={props => {
            // render a component if there is a current user
            return currentUser ? <Component {...props}/> : 
            <Redirect to="/login"/>
            }}
        ></Route>
    )
}

export default PrivateRoute