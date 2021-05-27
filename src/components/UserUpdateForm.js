import React from 'react'
import {useAuth} from '../AuthContext'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { Alert } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';
import firebase from 'firebase/app'




function UpdateUserForm() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [photoURL, setPhotoURL] = React.useState();
    const [password, setPassword] = React.useState("");
    const [confPassword, setConfPassword] = React.useState("");
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);
    
    const {updateProfile, currentUser, updateEmail, updatePassword} = useAuth(); // pulling the signup function from context using the hook
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                setError("");
                setLoading(true);
                if(password && password !== confPassword){
                    return setError("passwords must match");
                }
                await updateEmail(email || currentUser.email); // value from forms
                await updateProfile(name || currentUser.displayName, photoURL || currentUser.photoURL);
                if(password) {
                    await updatePassword(password)
                }
    
                history.push('/');

                const decoded = await firebase.auth().currentUser.getIdToken(true);
                await axios({
                    method: "PUT",
                    url:"/posts/postedBy/update",
                    data: {
                        username: name
                    },
                    headers: {
                        'authtoken': decoded
                    }
                });
                

                
            } catch {
                setError("failed to update the account");

            }
        setLoading(false);
    }

    React.useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setError("");
          }, 8500)
          return () => {
              clearTimeout(timeId);
          }
    }, []);
    
    return (
        <div>
            <Sidebar/>
            <StyledSignup>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="container">
                <div className="alert">
                </div>
                    <h1>Update form</h1>
                
                    <br></br>
                
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} defaultValue={currentUser.email} />
                        <br></br>
                        <input type="text" onChange={(e) => setName(e.target.value)} defaultValue={currentUser.displayName}/>
                        <br></br>
                        <input type="text" onChange={(e) => setPhotoURL(e.target.value)} defaultValue={currentUser.photoURL}/>
                        <br></br>
                        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank if you want the password unchanged"/>
                        <br></br>
                        <input type="text" onChange={(e) => setConfPassword(e.target.value)} placeholder="Leave blank if you want the password unchanged"/>
                        <br></br>
                        <div>
                            <input className="submitBtn" type="submit" value="Update" disabled={loading}/>
                        </div>
                    </form>
                </div>
            </StyledSignup>
        </div>
    )
}

const StyledSignup = styled.div`
    letter-spacing: 2px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: black;
    
    
    .container {
        padding: 1rem;
        border-radius: 10px;
        background-color: lightgreen;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 65vh;
        width: 33%;
        -webkit-box-shadow: 0px 0px 20px 2px #000000; 
        box-shadow: 0px 0px 20px 2px #000000;
        h1 {
        
            margin-bottom: 1rem;
            letter-spacing: 12px;
            font-size: 2.5rem;
            color: gray;
        }
        form {
            width: 75%;
            display: flex;
            flex-direction: column;
            /* align-items: flex-start; */
            justify-content: center;
            input {
                letter-spacing: 2px;
                color: black;
                border: none;
                background-color: transparent;
                border-bottom: 2px gray solid;
                padding-bottom: .75rem;
                outline: none;
                margin-bottom: 1rem;
                font-family: 'Barlow Condensed', sans-serif;
            }
            div {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .submitBtn {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 1.15rem;
                    cursor: pointer;
                    outline: none;
                    background-color: transparent;
                    width: 35%;
                    border-radius: 10px;
                    letter-spacing: 2px;
                    border: 2px solid lightseagreen;
                   
                    padding: .75rem;
                    margin-top: .5rem;
                    transition: all .25s ease-in-out;
                    font-weight: bold;
                    &:hover {
                        background-color: lightseagreen;
                    }
                }
            }
        }
        div {
            text-align: center;
            color: white;
            font-size: 1.2rem;
            span {
                a {
                    text-decoration: none;
                    color: blue;
                    border-bottom: 2px blue solid;
                }
            }
        }
    }


`

export default UpdateUserForm;
