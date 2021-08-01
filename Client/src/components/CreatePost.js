import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Sidebar from './Sidebar'
import {useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function CreatePost() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("Gaming");
    const history = useHistory();
 

    // create event with the currentUser
    const CreatePost = async (e) => {
        e.preventDefault();  
        try {
            await axios.post(
                "/posts",
                {
                    title: title,
                    description: description,
                    category: category
                }, 
                { withCredentials: true });
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
                        <Form.Group className="fieldContainer">
                            <Form.Label>Post title</Form.Label>
                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="fieldContainer">
                            <Form.Label>Post Description</Form.Label>
                            <Form.Control as="textarea" row={3} type="text" onChange={(e) => setDescription(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="fieldContainer">
                            <Form.Label htmlFor="categories">Select post category:</Form.Label>
                                <Form.Control as="select" name="categories" id="categories" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Science">Science</option>
                                    <option value="Food">Food</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="fieldContainer">
                            <Button type="submit" variant="outline-success">Create post</Button>
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
    .formContainer {
        width: 50%;
        .fieldContainer {
            margin-top: 1rem;
        }
    }
`

export default CreatePost
