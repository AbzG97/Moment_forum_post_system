import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useUserContext} from '../src/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useUserContext();
    return (
        <Route {...rest} render={props => (
            user ? Component ? <Component {...props}/> :
            rest.render(props) : <Redirect to="/login"/>
        )}/>
    )
}

export default PrivateRoute