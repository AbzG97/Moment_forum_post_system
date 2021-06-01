import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import firebase from 'firebase/app'
import {Link} from 'react-router-dom'
import { Form } from 'react-bootstrap'
import {ButtonGroup, Button} from "@material-ui/core"

const SavedPost = ({posts, setPosts, setDetailedPost, savedPost}) => {
    const [token, setToken] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [show, setShow] = React.useState();
   
    const [toggleCommentForm, setToggleCommentForm] = React.useState(false);
     // get the token of the current user to be used in for authenticating the user to use the posts api 
     React.useEffect(() => {
        const getToken = async () => {
            if(firebase.auth().currentUser){
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                setToken(decoded);
            }
        }
        getToken();
    }, []);

    const PostComment = async (e) => {
        e.preventDefault();
        setMessage("comment posted");
        setToggleCommentForm(false);
        setShow(true);
        if(firebase.auth().currentUser){
            const decoded = await firebase.auth().currentUser.getIdToken(true);
            await axios({
                method: "POST",
                url: `/posts/comment/${savedPost._id}`,
                data: {
                    comment: comment
                },
                headers: {
                    'authtoken': decoded
                }
            })
        }
        
    }

    // unsave the chosen savedPost 
    const unsavePost = async () => {
        if(firebase.auth().currentUser){
            const decoded = await firebase.auth().currentUser.getIdToken(true);
            await axios({
                method: "POST",
                url: `/posts/${savedPost._id}/unsave`,
                headers: {
                    'authtoken': decoded
                }
            });
        }
    }


    const ViewBtnHandler = async () => {
       localStorage.setItem('detailedPost', JSON.stringify(savedPost));
       setDetailedPost(savedPost);
    }


    const likePost = async () => {
        if(firebase.auth().currentUser){
            const decoded = await firebase.auth().currentUser.getIdToken(true);
            await axios({
                method: "POST",
                url: `/posts/${savedPost._id}/like`,
                headers: {
                    'authtoken': decoded
                }
            });
        }
        
    }

    return (
        <EventCard>
            <div className="container">
                <div className="data">
                    <p className="title">{savedPost.title}</p>
                    <p className="venue">{savedPost.description}</p>
                    <p>#{savedPost.category}</p>
                    <p>posted by <strong>{savedPost.postedBy.username}</strong></p>
                    <ButtonGroup color="primary" variant="text">
                        <Button onClick={ViewBtnHandler}>
                            <Link to={`/details/${savedPost._id}`}>View</Link>
                        </Button>
                        <Button onClick={() => setToggleCommentForm(!toggleCommentForm)}>Comment</Button>
                        <Button onClick={unsavePost}>Unsave</Button>
                        <Button onClick={likePost}>Like /  {savedPost.likes}</Button>
                    </ButtonGroup>
                    {toggleCommentForm && <Form onSubmit={PostComment}>
                        <Form.Group>
                            <Form.Control placeholder="write a comment" onChange={(e) => setComment(e.target.value)} required/>
                            <Button type="submit" variant="outline-success">Post comment</Button> 
                        </Form.Group>
                        
                    </Form>}
                </div>
            </div>
        </EventCard>
            
            
    )
}

const EventCard = styled.div`
    margin: 1rem;
    letter-spacing: 2px;
    color: black;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 25px 1px #000000; 
    box-shadow: 0px 0px 25px 0px #000000;
    position: relative;
    a {
        text-decoration: none;
    }
    .picture {
        width: 100%;
        height: 50%;
    
    }
    .container {
        padding: .75rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        
        .data {
            .title {
                font-size: 2rem;
            }
            .venue {
                font-size: 1.25rem;
                /* margin-right: 1rem; */
            }
            .date {
                font-size: .75rem;
                position: absolute;
                top: 0;
                left: 0;
                color: white;
                background-color: lightgreen;
                font-size: 1.25rem;
                padding: .5rem;
            }
            
        }
        .icons {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            border-left: 2px solid limegreen;
            padding-left: .5rem;
            
            .icon {
                margin-bottom: .5rem;
                cursor: pointer;
                transition: all .25s ease-in-out;
                &:hover {
                    color: magenta;
                }

            }
            .liked {
                color : red;
            }
        }
    }
    .stats {
        margin-top: 1rem;
        width: 100%;
        border-top: 2px limegreen solid;
        display: grid;
        grid-template-columns: 33% 33% 33%;
        justify-items: center;

        p{
            padding: 0rem 3rem 0rem 3rem;
            text-align: center;
        }
        .saves {
            border-right: 2px solid limegreen;
            border-left: 2px solid limegreen;
        }
    }
 
`

export default SavedPost;
