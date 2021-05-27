import React from 'react'
import firebase from 'firebase/app'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'



function UpdateForm({ updatedPost, setMessage }) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("Gaming");

    const [token, setToken] = React.useState();


    // get the token of the current user to be used in for authenticating the user to use the events api 
    React.useEffect(() => {
        const getToken = async () => {
            if (firebase.auth().currentUser) {
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                setToken(decoded);
            }
        }
        getToken();
    }, []);

    // create event with the currentUser
    const UpdatePost = async (e) => {
        // e.preventDefault();
        setMessage("Update successful");
        await axios({
            method: "PUT",
            url: `posts/update/${updatedPost._id}`,
            headers: {
                'authtoken': token
            },
            data: {
                title: title || updatedPost.title,
                description: description || updatedPost.description,
                category: category || updatedPost.category
            }
        })
    }

    return (
        <div>
            <div className="formContainer">
                <Form onSubmit={UpdatePost}>
                    <Form.Group>
                        <Form.Label>Post title</Form.Label>
                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={updatedPost.title} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Post Description</Form.Label>
                        <Form.Control as="textarea" row={3} type="text" onChange={(e) => setDescription(e.target.value)} defaultValue={updatedPost.description} />
                    </Form.Group>
                    <Form.Group style={{ width: "50%" }}>
                        <Form.Label htmlFor="categories">Select post category:</Form.Label>
                        <Form.Control as="select" name="categories" id="categories" onChange={(e) => setCategory(e.target.value)} defaultValue={updatedPost.category}>
                            <option value="Gaming">Gaming</option>
                            <option value="Programming">Programming</option>
                            <option value="Science">Science</option>
                            <option value="Food">Food</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button style={{ marginTop: "1rem" }} type="submit" variant="outline-success">Update post</Button>
                    </Form.Group>
                </Form>

            </div>
        </div>
    )
}



export default UpdateForm
