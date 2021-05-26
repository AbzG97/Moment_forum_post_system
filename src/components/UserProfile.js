import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import firebase from 'firebase/app'
import UpdateForm from './UpdateForm'
import {Alert, Button, ButtonGroup, Modal} from 'react-bootstrap'
import {useAuth} from '../AuthContext'
import reactDom from 'react-dom'


const UserProfile = ({setDetailedPost}) => {
    
    const [postsMadeByUser, setPostsMadeByUser] = React.useState();
    const [token, setToken] = React.useState("");
    const [loading, setLoading] = React.useState();
    const [deleted, SetDeleted] = React.useState(false);
    const [updateForm, setUpdateForm] = React.useState(false);
    const [updatedPost, setUpdatedPost] = React.useState();
    const [message, setMessage] = React.useState();
    const {currentUser, deleteProfile} = useAuth();
    const [showModal, setShowModal] = React.useState();
    const [deleteUserPosts, setDeleteUserPosts] = React.useState(false);

    const history = useHistory();
   
   


    React.useEffect(() => {
        const getToken = async () => {
            setLoading(true)
            if(firebase.auth().currentUser){
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                const response = await axios({
                    method: "get",
                    url: "/user/profile/myPosts",
                    headers: {
                        "authtoken": decoded
                    }
                });
                setPostsMadeByUser(response.data.posts);
                setToken(decoded);
            }
        }
        getToken();
        setLoading(false);
    }, [deleted]); // user posts are retreived from database everytime a post is deleted


   
    const handleShowModal = () => setShowModal(true); 
    const handleCloseModal = () => setShowModal(false); 

    const handelUserDelete = async () => {
        await deleteProfile();
        await axios({
            method: "delete",
            url: "/posts/cascadeDelete",
            data: {
                uid: currentUser.uid
            }
        }); 
        history.push("/login");
       
    } 

   


    return (
        <>
        

        <StyledProfile>
            <Sidebar/>
                <div className="profileContainer">
                    <img  src={currentUser.photoURL} alt="profile photo"/>   
                    <p>{currentUser.displayName}</p>
                    <p>{currentUser.email}</p>
                    <div className="userStats">
                        <div><p>Posts made </p><span>0</span></div>
                        <div><p>Posts liked </p><span>0</span></div>
                        <div><p>Posts saved </p><span>0</span></div>
                    </div>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                    <tbody>
                        {!loading && postsMadeByUser && postsMadeByUser.map((post) => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{post.category}</td>
                                <td>
                                <Button variant="outline-warning" onClick={() => {
                                    setUpdateForm(!updateForm)
                                    setUpdatedPost(post);
                                }}>Update</Button> / <Button variant="outline-danger" onClick={async () => {
                                    await axios({
                                        method:"DELETE",
                                        url: `/posts/delete/${post._id}`,
                                        headers: {
                                            'authtoken': token
                                        }
                                    });
                                    SetDeleted(!deleted);

                                }}>Delete</Button> / <Link to={`/details/${post._id}`}><Button variant="outline-info" onClick={() =>
                                    { localStorage.setItem('detailedPost', JSON.stringify(post));
                                setDetailedPost(post)}}>View</Button></Link> </td>
                            </tr>
                                    
                        ))}
                    </tbody>
                </table>
            </div>
            {updateForm && <UpdateForm updatedPost={updatedPost} setMessage={setMessage} />}

           
        </StyledProfile>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header>
            <Modal.Title>Profile deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to delete your profile ?</Modal.Body>
            <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
                Cancel
            </Button>
            <Button variant="outline-danger" onClick={handelUserDelete}>
                Confirm deletetion
            </Button>
            </Modal.Footer>
        </Modal>
            
        </>
            
        
    )
}

const StyledProfile = styled.div`
    /* margin-top: 3%; */
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
            /* button {
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
            } */
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
