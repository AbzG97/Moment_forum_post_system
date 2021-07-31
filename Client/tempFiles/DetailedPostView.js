import React from 'react'
import axios from 'axios'
import firebase from 'firebase/app'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import { ListGroup } from 'react-bootstrap';


function DetailedPostView({detailedPost, setDetailedPost}) {  
    const [loading, setLoading] = React.useState();
    const [LSData, setLSData] = React.useState();
    const [parsed, setParsed] = React.useState(JSON.parse(localStorage.getItem("detailedPost"))); // used to keep the _id of current detailedPost to call the api again in case user refreshes and not crashing the app

    

   
    React.useEffect(() => {
        setLoading(true);
        const GetPost = async (e) => {
            if(firebase.auth().currentUser){
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                const response = await axios({
                    method: "GET",
                    url: `/posts/${parsed._id}`,
                    headers: {
                        'authtoken': decoded
                    }
                })
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
                    <ListGroup variant="flush">
                        {LSData.comments.map((comment) => (
                            <ListGroup.Item>{comment.commentDesc} <strong>by</strong> {comment.commentBy.username}</ListGroup.Item>

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
