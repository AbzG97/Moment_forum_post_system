import React from 'react'
import axios from 'axios'


export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const Signup = async (name, email, password) => {
        await axios.post('/users/create', { name, email, password});
        const current_user = await axios.get('/users/me', {withCredentials: true});
        setUser(current_user.data)

    }

    const Login = async (email, password) => {
        await axios.post('/users/login', { email, password});
        const current_user = await axios.get('/users/me', {withCredentials: true});
        setUser(current_user.data);

    }

    

    const Logout = async () => {
        await axios.post("/users/logout", {withCredentials: true});
        setUser();
    }


    const deleteProfile = async () => {
        await axios.delete("/users/me/delete", {withCredentials: true});
        setUser();
    }

    
    
    const updateProfile = async (name, email, password) => {
        await axios.put('/users/profile/update' , {name, email, password} ,{withCredentials: true});

    }

    React.useEffect(() => {
        // set current user
        const fetchCurrentUser = async () => {
            const current_user = await axios.get('/users/me', {withCredentials: true});
            setUser(current_user.data);
            setLoading(false);
            
        }
        fetchCurrentUser();
    }, [])

    return (
        <UserContext.Provider value={{user, Signup, Login, Logout, deleteProfile, updateProfile}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext);