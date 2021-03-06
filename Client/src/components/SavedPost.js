import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useUserContext } from '../AuthContext'

const SavedPost = ({setDetailedPost, savedPost}) => {
    const { user } = useUserContext();
   


   

    // unsave the chosen savedPost 
    const unsavePost = async () => {
        if(user){
            await axios({
                method: "POST",
                url: `/posts/${savedPost._id}/unsave`,
                
            }, {withCredentials: true});
        }
    }


    const ViewBtnHandler = async () => {
       localStorage.setItem('detailedPost', JSON.stringify(savedPost));
       setDetailedPost(savedPost);
    }


    const likePost = async () => {
        if(user){
            await axios({
                method: "POST",
                url: `/posts/${savedPost._id}/like`,
            }, {withCredentials: true});
        }
        
    }

    return (
        <EventCard>
            <div className="container">
                <div className="data">
                    <p className="title">{savedPost.title}</p>
                    <p className="description">{savedPost.description.slice(0, 40)}....</p>
                    <p>#{savedPost.category}</p>
                    <p>posted by <strong>{savedPost.postedBy.username}</strong></p>
                    <p className="date">{savedPost.date ?  savedPost.date.slice(0,10) : savedPost.date}</p>
                    <div className="buttonGroup">
                        <Link to={`/details/${savedPost._id}`}><Button className="button" variant="outline-primary" onClick={ViewBtnHandler}>View</Button></Link> /
                        <Button className="button"  variant="outline-dark" onClick={unsavePost}>Unsave</Button> /
                        <Button className="button" variant="outline-success" onClick={likePost}>Like /  {savedPost.likes}</Button>
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
            margin-top: 2rem;
            .buttonGroup {
                margin-bottom: 1rem;
                }
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
export default SavedPost;
