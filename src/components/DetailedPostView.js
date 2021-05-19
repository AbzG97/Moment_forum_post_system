import React from 'react'
import axios from 'axios'
import firebase from 'firebase/app'
import styled from 'styled-components'
import Sidebar from './Sidebar';

function DetailedPostView({post}) {
  
    const [comment, setComment] = React.useState();
    const [token, setToken] = React.useState();
    const [detailedPost, setDetailedPost] = React.useState();
    const [loading, setLoading] = React.useState();

      // get the token of the current user to be used in for authenticating the user to use the events api 
      React.useEffect(() => {
        setLoading(true);
        const getToken = async () => {
            if(firebase.auth().currentUser){
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                setToken(decoded);
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:3001/events/${post._id}`,
                    headers: {
                        'authtoken': decoded
                    }
                })
                setDetailedPost(response.data);
            }
        }
        getToken();
        setLoading(false);
    }, []);


    const PostComment = async () => {
        await axios({
            method: "POST",
            url: `http://localhost:3001/event/comment/${post._id}`,
            data: {
                comment: comment
            },
            headers: {
                'authtoken': token
            }
        })
    }

    return (
        <div>
            <Sidebar/>
            <DetailedEvent>
                <h1>Detailed post page</h1>
                {!loading && <p>{JSON.stringify(detailedPost)}</p>}
                <form onSubmit={PostComment}>
                    <input placeholder="write a comment" onChange={(e) => setComment(e.target.value)}/>
                    <input value='post comment' type="submit"/> 
                </form>
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
