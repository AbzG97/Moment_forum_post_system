import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import firebase from 'firebase/app'
import {Link} from 'react-router-dom'
import {ButtonGroup, Button, Form} from 'react-bootstrap'

const Post = ({post, setDetailedPost,setMessage, setShow}) => {
    const [token, setToken] = React.useState("");
    const [comment, setComment] = React.useState("");
   
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
                url: `/posts/comment/${post._id}`,
                data: {
                    comment: comment
                },
                headers: {
                    'authtoken': decoded
                }
            })
        }
        
    }


    const ViewBtnHandler = async () => {
       localStorage.setItem('detailedPost', JSON.stringify(post));
       setDetailedPost(post);
    }

    return (
        <EventCard>
            <div className="container">
                <div className="data">
                    <p className="title">{post.title}</p>
                    <p className="venue">{post.description}</p>
                    <p>#{post.category}</p>
                    <p>posted by <strong>{post.postedBy.username}</strong></p>
                    <ButtonGroup>
                        <Link  to={`/details/${post._id}`}><Button variant="outline-primary" onClick={ViewBtnHandler}>View</Button></Link>
                        <Button variant="outline-secondary" onClick={() => setToggleCommentForm(!toggleCommentForm)}>Comment</Button>

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

export default Post;
