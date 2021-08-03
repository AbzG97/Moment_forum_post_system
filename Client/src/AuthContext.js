import React from 'react'
import axios from 'axios'


export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = React.useState();

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

    const fetchCurrentUser = async () => {
        const current_user = await axios.get('/users/me', {withCredentials: true});
        setUser(current_user.data);
        return user;
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

    return (
        <UserContext.Provider value={{user, Signup, Login, fetchCurrentUser, Logout, deleteProfile, updateProfile}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext);