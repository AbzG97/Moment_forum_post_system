import React, { Profiler } from 'react'
import { useAuth } from '../AuthContext'
import {Link, Switch, Route, useHistory, useParams, useRouteMatch} from 'react-router-dom'
import axios from 'axios'
import firebase from "firebase/app";
import styled from 'styled-components'
import Event from './Event';
import UserProfile from './UserProfile'
import Sidebar from './Sidebar';
import Cards from './Cards';
import SavedPosts from './SavedPosts';

function Dashboard() {
    const {currentUser, Logout} = useAuth();
    const {path} = useRouteMatch();
    const [events, setEvents ] = React.useState('');
    const history  = useHistory();
    // const [token, setToken] = React.useState();
    const [loading, setLoading] = React.useState();
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
 

    // // get the token of the current user to be used in for authenticating the user to use the events api 
    // React.useEffect(() => {
    //     const getToken = async () => {
    //         if(firebase.auth().currentUser){
    //             const decoded = await firebase.auth().currentUser.getIdToken(true);
    //             setToken(decoded);
    //         }
    //     }
    //     getToken();
    // }, []);

    // get all posts made in the database when page renders
    React.useEffect(() => {
        const FetchEvents = async () => {
            setLoading(true);
            const respoonse = await axios({
                method: "get",
                url: "http://localhost:3001/events",
                headers : {
                    'authtoken': token
                    }
                })
                setEvents(respoonse.data);
            }
        FetchEvents();
        setLoading(false);
    }, [])

   

    

    // const requestAPI = async () => {
       
    //     } 

    //     const SendData = async () => {
    //         const request = await axios({
    //             method: "post",
    //             url: "http://localhost:3001/post",
    //             headers : {
    //                 'authtoken': token
    //             },
    //             data: {
                   
    //             }
    //             })
    //         } 

    

    //     // get the events that were made by the current user
    //     const FetchMyEvents = async () => {
    //         const myEvents = await axios({
    //             method: "get",
    //             url: "http://localhost:3001/user/profile/myEvents",
    //             headers: {
    //                 'authtoken': token
    //             }
    //         });

    //         console.log(myEvents.data);

     //   }
    return (
        <div>
            <Sidebar/>
            
            <EventsContainerStyle>
                <h1>Dashboard</h1>
                {/* <h2>{error}</h2> */}
                <button>Create post</button>
                <div className="cards">
                    {events && events.events.map((event) =>(
                        <Event key={event._id} event={event}/>
                    ))}
                </div>
                {/* <button >Log out</button>
                <button onClick={requestAPI}>request API</button>
                <button onClick={SendData}>send data</button>
                <button onClick={CreateEvent}>Create event</button>
                <button onClick={FetchMyEvents}>fetch my events event</button> */}
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
        grid-template-rows: 63%;
    }

`


export default Dashboard

  