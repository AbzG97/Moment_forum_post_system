import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useAuth} from '../AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useAuth();
    return (
        <Route {...rest} render={props => (
            currentUser ? Component ? <Component {...props}/> :
            rest.render(props) : <Redirect to="/login"/>
        )}/>
    )
}

export default PrivateRoute