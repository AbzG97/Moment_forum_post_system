import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useUserContext} from '../AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const { fetchCurrentUser, user, loading } = useUserContext();
    

    return (
        <Route {...rest} render={props => (
            user ? Component ? <Component {...props}/> :
            rest.render(props) : <Redirect to="/login"/>
        )}/>
    )
}

export default PrivateRoute