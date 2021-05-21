import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Sidebar from './Sidebar';
import firebase from 'firebase/app'
import {useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';

function CreatePost() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("Gaming");
    const [token, setToken] = React.useState("");
    const history = useHistory();

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
        try {
            await axios({
                method: "post",
                url: "/posts",
                headers : {
                    'authtoken': token
                },
                data: {
                    title: title,
                    description: description,
                    category: category
                }
            });
            history.push("/");
        } catch {
            console.log("error happened while creating a post");
        }
        
    }
       
    return (
        <div>
            <Sidebar/>
            <CreatePostForm>
                <h1>Create post</h1>
                <div className="formContainer">

                    <Form onSubmit={CreatePost}>
                        <Form.Group>
                            <Form.Label>Post title</Form.Label>
                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Post Description</Form.Label>
                            <Form.Control as="textarea" row={3} type="text" onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>
                        <Form.Group style={{width: "50%"}}>
                            <Form.Label htmlFor="categories">Select post category:</Form.Label>
                                <Form.Control as="select" name="categories" id="categories" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Gaming" selected>Gaming</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Science">Science</option>
                                    <option value="Food">Food</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button style={{marginTop: "1rem"}} type="submit" variant="outline-success">Create post</Button>
                        </Form.Group>
                    </Form>
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
