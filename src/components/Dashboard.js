import React, { Profiler } from 'react'
import { useAuth } from '../AuthContext'
import {Link, Switch, Route, useHistory, useParams, useRouteMatch} from 'react-router-dom'
import axios from 'axios'

import styled from 'styled-components'
import Event from './Event';
import UserProfile from './UserProfile'
import Sidebar from './Sidebar';


function Dashboard({posts, setDetailedPost}) {

    return (
        <div>
            <Sidebar/>
            <EventsContainerStyle>
                <h1>Dashboard</h1>
                <button>Create post</button>
                <div className="cards">
                    {posts && posts.events.map((event) =>(
                        <Event key={event._id} setDetailedPost={setDetailedPost} event={event}/>
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
        grid-template-rows: 63%;
    }

`


export default Dashboard

  