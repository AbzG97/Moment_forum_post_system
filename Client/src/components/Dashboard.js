import React from 'react'
import firebase from 'firebase/app'
import axios from 'axios'
import styled from 'styled-components'
// import Post from './Post';
import Sidebar from './Sidebar';
import {Alert} from 'react-bootstrap'
import Post from './Post'
import { useUserContext } from '../AuthContext';



const Dashboard = ({posts, setPosts, detailedPost, setDetailedPost, savedPosts, setSavedPosts}) => {
    const [loading, setLoading] = React.useState();
    const [message, setMessage] = React.useState();
    const [show, setShow] = React.useState(false);
    const {user} = useUserContext();

    //get the token of the current user to be used in for authenticating the user to use the events api 
    React.useEffect(() => {
        setLoading(true);
        const GetPosts = async () => {
            if(user){

                const respoonse = await axios({
                method: "get",
                url: "/posts",
                }, {withCredentials: true});
                // user isn't logged in
                setPosts(respoonse.data.posts);
            } else {
                const respoonse = await axios({
                    method: "get",
                    url: "/posts",
                });
                // user isn't logged in
                setPosts(respoonse.data.posts);
            }   
        }
        GetPosts();
        setLoading(false);
    }, [posts]);


    React.useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
          }, 8500)
          return () => {
              clearTimeout(timeId);
          }
    }, []);

    return (
        <div>
            <Sidebar/>
            <EventsContainerStyle>
                {show && <Alert variant="success">{message}</Alert>} 
                <h1>Dashboard</h1>
                
                <div className="cards">
                    {!loading && posts && posts.map((post) =>(
                        <Post key={post._id} post={post} detailedPost={detailedPost} 
                        setDetailedPost={setDetailedPost} message={message} 
                        setMessage={setMessage} setShow={setShow} savedPosts={savedPosts} 
                        setSavedPosts={setSavedPosts}/>
                    ))} 
                </div>
            </EventsContainerStyle> 
        </div>

          
    )
}

const EventsContainerStyle = styled.div`
    margin-top: 3%;
    margin-left: 22%;
    padding: 1rem;
    .cards {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-template-rows: auto;
    }

`


export default Dashboard

  