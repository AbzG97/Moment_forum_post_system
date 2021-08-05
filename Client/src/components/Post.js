import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Form, ButtonGroup, Button, Badge} from 'react-bootstrap'
import { useUserContext } from '../AuthContext'

const Post = ({post, setDetailedPost,setMessage, setShow, savedPosts, setSavedPosts}) => {
    
    const [saveStatus, setSaveStatus] = React.useState(false);
    const {user} = useUserContext();
    

    // check the status of a post
    React.useState(() => {
        savedPosts.map((saved) => {
            if(saved._id === post._id){
                setSaveStatus("saved");
            }
        })

    }, [savedPosts])

    

    // save the chosen post 
    const savePost = async () => {
        if(user){
            await axios({
                method: "POST",
                url: `/posts/${post._id}/save`,
                
            }, {withCredentials: true});
            setSaveStatus(true);
        }
    }


    const ViewBtnHandler = async () => {
       localStorage.setItem('detailedPost', JSON.stringify(post));
       setDetailedPost(post);
    }

    const likePost = async () => {
        if(user){
            await axios({
                method: "POST",
                url: `/posts/${post._id}/like`,
                
            }, {withCredentials: true});
        }
        
    } 
    return (
        <EventCard>
             
            <div className="container">
                <div className="data">
                    <p>{saveStatus ? "saved" : "not saved"}</p>
                    <p className="title">{post.title}</p>
                    <p className="description">{post.description.slice(0, 40)}....</p>
                    <p>#{post.category}</p>
                    <p>posted by <strong>{post.postedBy.username}</strong></p>
                    <p className="date">{post.date ?  post.date.slice(0,10) : post.date}</p>
                    <div className="buttonGroup">
                        <Link to={`/details/${post._id}`}><Button className="button" variant="outline-primary" onClick={ViewBtnHandler}>View</Button></Link> /
                        <Button className="button"  variant="outline-dark" onClick={savePost} disabled={saveStatus || !user ? true : false} >Save</Button> /
                        <Button className="button" variant="outline-success" onClick={likePost} disabled={user ? false : true}>Like /  {post.likes}</Button>
                    </div>
                    
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
        color: blue;
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
            .buttonGroup {
                margin-bottom: 1rem;
            }
            .title {
                font-size: 2rem;
            }
            .date {
                font-size: .25rem;
                position: absolute;
                top: 0;
                right: 0;
                color: white;
                background-color: lightgreen;
                font-size: 1.25rem;
                padding: .5rem;
                border-top-right-radius: 10px;
    
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
