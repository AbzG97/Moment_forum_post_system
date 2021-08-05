import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { ListGroup, Alert, Form, Button} from 'react-bootstrap'
import {useUserContext} from "../AuthContext"
import {Link} from 'react-router-dom'
 

function DetailedPostView() {  
    const [loading, setLoading] = React.useState();
    const [LSData, setLSData] = React.useState();
    const [comment, setComment] = React.useState("");
    const [toggleCommentForm, setToggleCommentForm] = React.useState(false);
    const [message, setMessage] = React.useState();
    const [show, setShow] = React.useState();
    const [commentPosted, setCommentPosted] = React.useState(false);


    // used to keep the _id of current detailedPost to call the api again in case user refreshes and not crashing the app
    const [parsed, setParsed] = React.useState(JSON.parse(localStorage.getItem("detailedPost"))); 
    const {user} = useUserContext();

    const PostComment = async (e) => {
        e.preventDefault();
        setMessage("comment posted");
        setToggleCommentForm(false);
        setShow(true);
        if(user){
            await axios({
                method: "POST",
                url: `/posts/comment/${parsed._id}`,
                data: {
                    comment: comment
                },
               
            }, {withCredentials: true})
        }
        setCommentPosted(!commentPosted);
    }

   
    React.useEffect(() => {
        setLoading(true);
        const GetPost = async (e) => {
            if(user){
                
                const response = await axios({
                    method: "GET",
                    url: `/posts/${parsed._id}`,
                    
                }, {withCredentials: true});

                setLSData(response.data.post);
            } else {
                const response = await axios({
                    method: "GET",
                    url: `/posts/${parsed._id}`,
                })
                setLSData(response.data.post);
            }
        }
        GetPost();
        setLoading(false);
    },[commentPosted])
    

    return (
        <div>
            <Sidebar/>
            <DetailedEvent>
                {show && <Alert variant="success">{message}</Alert>}
                <h1>Detailed post page</h1>
                {!loading && LSData && <div>
                    <h2>{LSData.title}</h2>
                    <p>#{LSData.category}</p>
                    <p>Likes: {LSData.likes}</p>
                    <p>Posted on: {LSData.date.slice(0, 10)}</p>
                    <p>{LSData.description}</p>
                    <p>Post by {LSData.postedBy.username}</p>
                    <div className="buttons">
                        <Link to="/"><Button className="button" variant="outline-primary">Dashboard</Button></Link> / 
                        <Button className="button" variant="outline-warning" 
                            onClick={() => setToggleCommentForm(!toggleCommentForm)}  
                            disabled={user ? false : true}>Comment</Button>
                    </div>
                    
                    {toggleCommentForm && <Form className="commentForm" onSubmit={PostComment}>
                        <Form.Control placeholder="write a comment" onChange={(e) => setComment(e.target.value)} required/>
                        <Button className="postCommentBtn" type="submit" variant="outline-success">Post comment</Button>   
                    </Form>}
                    <ListGroup variant="flush">
                        {LSData.comments.map((comment) => (
                            <ListGroup.Item key={comment._id}>{comment.commentDesc} <strong>by</strong> {comment.username}</ListGroup.Item>

                        ))}
                    </ListGroup>
                </div>}
                
            </DetailedEvent>
           
            
        </div>
    )
}

const DetailedEvent = styled.div`
    margin-top: 3%;
    margin-left: 22%;
    padding: 1rem;
    .buttons {
        margin-bottom: 1rem;
        .button {
            margin: .75rem;
        }
    }
    .commentForm {
        margin: .75rem;
        .postCommentBtn {
        margin-top: 1rem;
        }
    }
`

export default DetailedPostView
