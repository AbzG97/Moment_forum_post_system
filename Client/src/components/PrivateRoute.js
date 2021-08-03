import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useUserContext} from '../AuthContext'

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
    const {user, fetchCurrentUser} = useUserContext();
    return (
        <Route {...rest} render={props => (
            user ? Component ? <Component {...props}/> :
            rest.render(props) : <Redirect to="/login"/>
        )}/>
    )
}

export default PrivateRoute