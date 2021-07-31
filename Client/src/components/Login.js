import React from 'react'
import {useUserContext} from '../AuthContext'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { Alert} from 'react-bootstrap';


function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const {Login} = useUserContext(); 
    const history = useHistory();
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await Login(email, password); // value from forms
            history.push('/'); // push to dashboard after succesful login
            
         } catch {
            setError("failed to sign in");

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
        <StyledLogin>
        <div className="alert">
            {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required/>
                <br></br>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <br></br>
                <div>
                <input className="submitBtn" type="submit" value="Login" disabled={loading}/>
                </div>
                
            </form>
            <div>
                <p>Don't have an acount with us ?</p>
                <span><Link to="/signup">here</Link></span>
            </div>
            
        </div>
    </StyledLogin>
    )
}

const StyledLogin = styled.div`
    color: black;
    letter-spacing: 2px;
    /* background-color: #8a00e0; */
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .alert {
        margin-bottom: 2rem;
        padding: 1rem;
    }
    .container {
        border-radius: 10px;
        background-color: lightgreen;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 65vh;
        width: 25%;
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

export default Login;
