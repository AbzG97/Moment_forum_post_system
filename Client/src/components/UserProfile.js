import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import UpdateForm from '../components/UpdateForm'
import {Button, Modal} from 'react-bootstrap'
import {useUserContext} from '../AuthContext'



const UserProfile = ({setDetailedPost}) => {
    
    const [postsMadeByUser, setPostsMadeByUser] = React.useState();
    const [loading, setLoading] = React.useState();
    const [deleted, SetDeleted] = React.useState(false);
    const [updateForm, setUpdateForm] = React.useState(false);
    const [updatedPost, setUpdatedPost] = React.useState();
    const { user, fetchCurrentUser, deleteProfile } = useUserContext();
    const [showModal, setShowModal] = React.useState();
    const [error, setError] = React.useState();

    const history = useHistory();

    // React.useEffect(() => fetchCurrentUser(), []);
   
    React.useEffect(() => {
        const GetCurrentUserPosts = async () => {
            setLoading(true)
            const response = await axios({
                method: "GET",
                url: "/user/profile/myPosts"
                }, {withCredentials: true});
                setPostsMadeByUser(response.data.posts);
    
            }
        GetCurrentUserPosts();
        setLoading(false);
    }, [deleted]); // user posts are retreived from database everytime a post is deleted


    // delete profile modal
    const handleShowModal = () => setShowModal(true); 
    const handleCloseModal = () => setShowModal(false); 

    // posts update for modal
    const handleShowUpdateForm = () => setUpdateForm(true); 
    const handleCloseUpdateForm = () => setUpdateForm(false); 

    // deletes the comments and posts if the user decides to deletes their profile
    const handelUserPostsDelete = async () => {
        try {
            await deleteProfile();
            history.push("/");  
        } catch {
            setError("Error deleting the profile");
        }
             
    } 

    return (
        <>
        {user ? <StyledProfile>
            <Sidebar/>
                <div className="profileContainer">
                    {/* <img  src={cu.photoURL} alt="profile"/>    */}
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <div className="buttons">
                        <Link to="/updateProfile"><Button variant="outline-warning">Update profile</Button></Link>
                        <Button onClick={handleShowModal} variant="outline-danger">Delete profile</Button>
                    </div>
                </div>
            <div className="postsMade">
                <h2>Posts made</h2>
                <table>
                    <thead>
                            <tr>
                                <th>Title</th>
                                <th>Desciption</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    <tbody>
                        {!loading && postsMadeByUser && postsMadeByUser.map((post) => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{post.category}</td>
                                <td>{post.date.slice(0,10)}</td>
                                <td>
                                <Button variant="outline-warning" onClick={() => {
                                    handleShowUpdateForm();
                                    setUpdatedPost(post);
                                }}>Update</Button> / <Button variant="outline-danger" onClick={async () => {
                                    await axios({
                                        method:"DELETE",
                                        url: `/posts/delete/${post._id}`,
                                    }, {withCredentials: true});
                                    SetDeleted(!deleted);

                                }}>Delete</Button> / <Link to={`/details/${post._id}`}><Button variant="outline-info" onClick={() =>
                                    { localStorage.setItem('detailedPost', JSON.stringify(post));
                                setDetailedPost(post)}}>View</Button></Link> </td>
                            </tr>
                                    
                        ))}
                    </tbody>
                </table>
            </div>
           
        </StyledProfile> : <h2>Loading</h2>}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header>
            <Modal.Title>Profile deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to delete your profile ?</Modal.Body>
            <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
                Cancel
            </Button>
            <Button variant="outline-danger" onClick={handelUserPostsDelete}>
                Confirm deletetion
            </Button>
            User deletion is a dangerous process make sure you have logged in recently before confirming
            </Modal.Footer>
        </Modal>

        <Modal show={updateForm} onHide={handleCloseUpdateForm}>
            <Modal.Header>
                <Modal.Title>Update form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateForm updatedPost={updatedPost}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseUpdateForm}>Cancel</Button>
            </Modal.Footer>
            
        </Modal>
            
        </>
            
        
    )
}

const StyledProfile = styled.div`
    margin-left: 22%;
    padding: 1rem;
    .profileContainer {
        padding: 1rem;
        margin-top: 10%;
        -webkit-box-shadow: 0px 0px 23px 3px #000000; 
        box-shadow: 0px 0px 23px 3px #000000;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
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
        }
    }
    .postsMade {
            table {
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
