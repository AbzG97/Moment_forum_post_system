import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useAuth} from '../AuthContext'
import Sidebar from './Sidebar';
import firebase from 'firebase/app'

function CreatePost() {
    const {currentUser} = useAuth();
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [picture, setPicture] = React.useState("");
    const [category, setCategory] = React.useState("Gaming");
    const [token, setToken] = React.useState("");

    // get the token of the current user to be used in for authenticating the user to use the events api 
    React.useEffect(() => {
        const getToken = async () => {
            if(firebase.auth().currentUser){
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                setToken(decoded);
            }
        }
        getToken();
    }, []);

    // create event with the currentUser
    const CreatePost = async (e) => {
        e.preventDefault();

        await axios({
            method: "post",
            url: "http://localhost:3001/event",
            headers : {
                'authtoken': token
            },
            data: {
                title: title,
                description: description,
                picture: picture,
                category: category
            }
        })
    }
       
    return (
        <div>
            <Sidebar/>
            <CreatePostForm>
                <h1>Create post</h1>
                <div className="formContainer">
                    <form onSubmit={CreatePost}>
                        <div>
                            <label>Post title</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <label>Post Description</label>
                            <input type="text" onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div>
                            <label>Post Picture</label>
                            <input type="text" onChange={(e) => setPicture(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="categories">Select post category:</label>
                                <select name="categories" id="categories" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Gaming" selected>Gaming</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Science">Science</option>
                                    <option value="Food">Food</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" value="post"/>
                        </div>
                       

                    </form>

                </div>
            </CreatePostForm>
        </div>
        

    )
}

const CreatePostForm = styled.div`  
     margin-top: 3%;
    margin-left: 22%;
    padding: 1rem;
`

export default CreatePost
