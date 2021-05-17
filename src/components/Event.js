import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faComment } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import firebase from 'firebase/app'

function Event({event}) {
    const [likes, setLikes] = React.useState(event.likedBy.length);
    const [token, setToken] = React.useState("");
    
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

    const LikePost = async () => {
        let num = likes + 1;
        setLikes(num);
        await axios({
            method: "post",
            url: `http://localhost:3001/event/like/${event._id}`,
            data: {
                likes: num
            },
            headers: {
                'authtoken': token
            }
        })
        
        
    }

    return (
        <EventCard>
            <img className="picture" src={event.picture} alt="picture"/>
            <div className="container">
                
                <div className="data">
                    {/* <p className="date">{event.date}</p> */}
                    <p className="title">{event.title}</p>
                    <p className="venue">{event.description}</p>
                    <p>{JSON.stringify(event.category)}</p>
                    <button className="viewBtn">View</button>
                    
                </div>
            
                <div className="icons">
                    <FontAwesomeIcon className="icon" onClick={LikePost} icon={faHeart} size="lg"/>
                    <FontAwesomeIcon className="icon" icon={faBookmark} size="lg"/>
                    <FontAwesomeIcon className="icon" icon={faComment} size="lg"/>
                </div>

            </div>
            
            <div className="stats">
                <p>Likes <span>{likes}</span></p>
                <p className="saves">Saves <span>0</span></p>
                <p>Comments <span>0</span></p>

            </div>
        </EventCard>
            
            
    )
}

const EventCard = styled.div`
    margin: 1rem;
    letter-spacing: 2px;
    /* padding: 1rem; */
    /* background-color: #1b1b1b; */
    color: black;
    border-radius: 10px;
    /* border: 2px limegreen solid; */
    -webkit-box-shadow: 0px 0px 25px 1px #000000; 
    box-shadow: 0px 0px 25px 0px #000000;
    position: relative;
    /* height: 15vh; */
    .picture {
        width: 100%;
        height: 50%;
    
    }
    .container {
        padding: .75rem;
        display: flex;
        /* align-items: center; */
        flex-direction: row;
        justify-content: space-between;
        /* height: 17vh; */
        
        
        .data {
            /* background-color: red; */
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
            .viewBtn {
                letter-spacing: 2px;
                outline: none;
                background-color: transparent;
                padding: .25rem;
                margin-top: .5rem;
                border: 2px magenta solid;
                border-radius: 10px;
                width: 5vw;
                font-size: 1rem;
                cursor: pointer;
                transition: all .25s ease-in-out;
                &:hover {
                    background-color: magenta;
                }
            }
        }
        .icons {
            display: flex;
            flex-direction: column;
            /* background-color: red; */
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
        }
    }
    .stats {
        /* height: 100%; */
        margin-top: 1rem;
        /* padding-bottom: .25rem; */
        width: 100%;
        border-top: 2px limegreen solid;
        /* padding-bottom: .5rem; */
        display: grid;
        grid-template-columns: 33% 33% 33%;
        /* align-items: center; */
        justify-items: center;
        /* justify-content: space-around; */
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

export default Event
