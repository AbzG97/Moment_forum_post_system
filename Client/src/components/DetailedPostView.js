import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { ListGroup } from 'react-bootstrap'
import {useUserContext} from "../AuthContext"
import {Link} from 'react-router-dom'
 

function DetailedPostView({detailedPost, setDetailedPost}) {  
    const [loading, setLoading] = React.useState();
    const [LSData, setLSData] = React.useState();

    // used to keep the _id of current detailedPost to call the api again in case user refreshes and not crashing the app
    const [parsed, setParsed] = React.useState(JSON.parse(localStorage.getItem("detailedPost"))); 
    const {user} = useUserContext();

    

   
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
    },[])
    

    return (
        <div>
            <Sidebar/>
            <DetailedEvent>
                <h1>Detailed post page</h1>
                {!loading && LSData && <div>
                    <h2>{LSData.title}</h2>
                    <p>#{LSData.category}</p>
                    <p>Likes: {LSData.likes}</p>
                    <p>Posted on: {LSData.date.slice(0, 10)}</p>
                    <p>{LSData.description}</p>
                    <p>Post by {LSData.postedBy.username}</p>
                    <Link to="/">Back to posts</Link>
                    <ListGroup variant="flush">
                        {LSData.comments.map((comment) => (
                            <ListGroup.Item>{comment.commentDesc} <strong>by</strong> {comment.username}</ListGroup.Item>

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
    
`

export default DetailedPostView
