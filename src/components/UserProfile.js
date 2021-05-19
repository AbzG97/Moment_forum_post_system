import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { useAuth } from '../AuthContext'
import {Link, Switch, Route, useHistory, useParams, useRouteMatch} from 'react-router-dom'
import axios from 'axios'
import firebase from 'firebase/app'




function UserProfile() {
    const {currentUser} = useAuth();
    const [posts, setPosts] = React.useState([]);
    const [token, setToken] = React.useState("");
    const [loading, setLoading] = React.useState();


    React.useEffect(() => {
        const getToken = async () => {
            setLoading(true)
            if(firebase.auth().currentUser){
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                const response = await axios({
                    method: "get",
                    url: "http://localhost:3001/user/profile/myEvents",
                    headers: {
                        "authtoken": decoded
                    }
                });
                setPosts(response.data.posts);
            }
        }
        getToken();
        setLoading(false);
    }, []);
 

    // React.useEffect(() => {
    //     setLoading(true)
    //     const FetchPostsMadeByUser = async () => {
    //         const response = await axios({
    //             method: "get",
    //             url: "http://localhost:3001/user/profile/myEvents",
    //             headers: {
    //                 "authtoken": token
    //             }
    //         });
    //         setPosts(response.data);
    //     }
    //    FetchPostsMadeByUser();
    //    setLoading(false);
    // }, [])

    return (
       <StyledProfile>
           <Sidebar/>
            <div className="profileContainer">
                <p>Profile picture</p>
                <p>User name</p>
                <div className="userStats">
                    <div><p>Posts made </p><span>0</span></div>
                    <div><p>Posts liked </p><span>0</span></div>
                    <div><p>Posts saved </p><span>0</span></div>
                </div>
                <div className="buttons">
                    <button className="updateBtn">Update profile</button>
                    <button className="deleteBtn">Delete profile</button>
                </div>
           </div>
           <div className="postsMade">
               <h2>Posts made</h2>
               <table>
                    <tr>
                       <th>title</th>
                       <th>desciption</th>
                       <th>Action</th>
                   </tr>
                {!loading && posts && posts.map((post) => (
                    <tr>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td><button>Update</button> / <button>Delete</button> / <button><Link to={`/details/${post._id}`}>View</Link></button> </td>
                    </tr>
                            
                ))}
               </table>
           </div>
       </StyledProfile>
            
        
    )
}

const StyledProfile = styled.div`
    margin-top: 3%;
    margin-left: 22%;
    padding: 1rem;
    
    /* background-color: red; */
    .profileContainer {
        /* background-color: blue; */
        margin-top: 10%;
        -webkit-box-shadow: 0px 0px 23px 3px #000000; 
        box-shadow: 0px 0px 23px 3px #000000;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .userStats {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            width: 50%;
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                
            }
        }
        .buttons {
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 1rem;
            button {
                padding: .5rem;
                outline: none;
                background-color: transparent;
                border-radius: 12px;
                font-family: 'Barlow Condensed', sans-serif;
                letter-spacing: 3px;
                transition: all .25s ease-in-out;
                cursor: pointer;
            }
            .updateBtn {
                border: 2px solid yellow;
                color: yellow;
                &:hover {
                    background-color: yellow; 
                    color: black;
                }
            }
            .deleteBtn {
                border: 2px solid red;
                color: red;
                &:hover {
                    background-color: red; 
                    color: black;
                }
            }
        }
    }
    .postsMade {
            table {
                /* border: 2px solid black; */
                border-collapse:separate;
                border-spacing:0 5px;
                width: 100%;
                text-align: center;
                td {
                    border-bottom: 2px solid black;
                    padding-bottom: 1rem;
                } 
            }
        }
`

export default UserProfile
