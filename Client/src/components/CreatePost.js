import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Sidebar from './Sidebar';
import firebase from 'firebase/app'
import {useHistory} from 'react-router-dom'
// import { Form, Button } from 'react-bootstrap'
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from "@material-ui/core"

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
                <h1>Create post form</h1>
                <div className="formContainer">
                    <form noValidate autoComplete onSubmit={CreatePost}>
                        <TextField className="field" label="Title" onChange={(e) => setTitle(e.target.value)} required/>
                        <br></br>
                        <TextField className="field" label="Post description" rowsMax={5} onChange={(e) => setDescription(e.target.value)} required/>
                        <br></br>
                        <FormControl className="field" required>
                            <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                            <Select onChange={(e) => setCategory(e.target.value)}>
                                <MenuItem value="Gaming">Gaming</MenuItem>
                                <MenuItem value="Programming">Programming</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="Food">Food</MenuItem>
                            </Select>
                            <FormHelperText>Choose a category for your post</FormHelperText>
                        </FormControl>
                        <br></br>
                        <Button className="submitBtn" variant="contained" color="primary">Create Post</Button>
                    </form>

                    {/* <Form onSubmit={CreatePost}>
                        <Form.Group>
                            <Form.Label>Post title</Form.Label>
                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Post Description</Form.Label>
                            <Form.Control as="textarea" row={3} type="text" onChange={(e) => setDescription(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group style={{width: "50%"}}>
                            <Form.Label htmlFor="categories">Select post category:</Form.Label>
                                <Form.Control as="select" name="categories" id="categories" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Science">Science</option>
                                    <option value="Food">Food</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button style={{marginTop: "1rem"}} type="submit" variant="outline-success">Create post</Button>
                        </Form.Group>
                    </Form> */}
                </div>
            </CreatePostForm>
        </div>
        

    )
}

const CreatePostForm = styled.div`  
     margin-top: 3%;
    margin-left: 22%;
    padding: 1rem;
    h1 {
        text-align: center;
        padding-bottom: 1rem;
        font-size: 3rem;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* width: 50%; */
        background-color: lightgreen;
        font-size: 1.85rem;
        border-radius: 15px;
        padding: 1rem;
        .field {
            width: 50%;
            color: white;
            font-family: 'Raleway', sans-serif;
        }
        .submitBtn {
            font-family: 'Raleway', sans-serif;
        }
    }
`

export default CreatePost
