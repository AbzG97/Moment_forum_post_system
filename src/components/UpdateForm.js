import React from 'react'
import firebase from 'firebase/app'
import axios from 'axios'

function UpdateForm({updatedPost, setMessage}) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("Gaming");
    const [token, setToken] = React.useState();

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
    const UpdatePost = async (e) => {
        // e.preventDefault();
        setMessage("Update successful");
        await axios({
            method: "PUT",
            url: `posts/update/${updatedPost._id}`,
            headers : {
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
                <form onSubmit={UpdatePost}>
                    <div>
                        <label>Post title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={updatedPost.title}/>
                    </div>
                        <div>
                            <label>Post Description</label>
                            <input type="text" onChange={(e) => setDescription(e.target.value)} defaultValue={updatedPost.description}/>
                        </div>
                        <div>
                            <label htmlFor="categories">Select post category:</label>
                                <select name="categories" id="categories" onChange={(e) => setCategory(e.target.value)} defaultValue={updatedPost.category}>
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
        </div>
    )
}

export default UpdateForm
