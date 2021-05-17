import React from 'react'
import {auth} from './firebase'
import firebase from 'firebase/app'


const AuthContext = React.createContext()

// creating a custom to hook to use AuthContext
export const useAuth = () => {
    return React.useContext(AuthContext);
}


export function AuthProvider({ children }) {  
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = React.useState(true);
    // const [token, setToken] = React.useState("");



    // sign up function that will use firebase auth to create user and set it as current user
    const Signup = (email, password) => {
        // change this code if custom auth for server
       
       return auth.createUserWithEmailAndPassword(email, password);
    }

    const Login = (email, password) => {
        // change this code if custom auth for server
        
        return auth.signInWithEmailAndPassword(email, password);
    }

    const Logout = () => {
       return auth.signOut();

    }

    React.useEffect(() => {
        // set current user
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user); // saves current user in state 
            setLoading(false);
            
        });
        return unsub;
    }, [])

   
  

    const value = {
        currentUser,
        Signup,
        Login,
        Logout
    }
    return (
        // this component will contain data of the current user to be used anywhere in the app
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
            
    )
}


