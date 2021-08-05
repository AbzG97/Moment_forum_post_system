import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useUserContext} from '../AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const { fetchCurrentUser, user } = useUserContext();
    const [authenticated, setAuthenticated] = React.useState();
    const [loading, setLoading] = React.useState();
    // console.log(user);
    
//   React.useState(() => {
//     fetchCurrentUser();
//     setLoading(true);
//     if(user){
//         setAuthenticated(true);
//         setLoading(false);
//     }
// }, []);
    

    return (
        <Route {...rest} render={props => (
            user ? Component ? <Component {...props}/> :
            rest.render(props) : <Redirect to="/login"/>
        )}/>
    )
}

export default PrivateRoute