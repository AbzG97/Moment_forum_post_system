import React from 'react'
import { useAuth } from '../AuthContext'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components';

function Sidebar() {
    const {Logout, currentUser} = useAuth();
    const history = useHistory();
    const [error, setError] = React.useState('');


    const handleLogout = async () => {
        setError('')
        try {
            await Logout();
            history.push('/login');
        } catch {
            setError("failed to logout")

        }

    }
    return (
        <StyledMenu>
            <div className="userData">
                <img  src={currentUser.photoURL} alt="profile"/>
                <p>{currentUser.displayName}</p>
            </div>
            <ul className="links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/createpost">Create post</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
            
        </StyledMenu>
    )
}

const StyledMenu = styled.div`
    background-color: #1b1b1b;
    width: 20%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    color: white;
    a {
        text-decoration: none;
        color: white;
    }
    .userData {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 3rem 0rem 3rem 0rem;
    }
    .links {
        letter-spacing: 4px;
        list-style: none;
        padding: 2rem;
        width: 75%;
        li {
            margin: 1rem 0rem 1rem 0rem;
            cursor: pointer;
            transition: all .25s ease-in-out;
            padding: 0.5rem;
            border-radius: 15px;
            &:hover {
                a {
                    color: black;
                }
                background-color: white;
                color: black;
                font-weight: bold;        
            }
        }
    }

`

export default Sidebar

