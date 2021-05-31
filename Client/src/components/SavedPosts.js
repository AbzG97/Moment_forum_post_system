import React from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import firebase from 'firebase/app'
import axios from 'axios'
import SavedPost from './SavedPost'

function SavedPosts({posts, setPosts, setDetailedPost, savedPosts, setSavedPosts}) {
    // const [savedPosts, setSavedPosts] = React.useState([]);
    const [loading, setLoading] = React.useState();
     // get the token of the current user to be used in for authenticating the user to use the events api 
     React.useEffect(() => {
        setLoading(true);
        const GetSavedPosts = async () => {
            if(firebase.auth().currentUser){
                const decoded = await firebase.auth().currentUser.getIdToken(true);
                const respoonse = await axios({
                method: "get",
                url: "/posts/profile/savedPosts",
                headers : {
                    'authtoken': decoded
                    }
                });
                setSavedPosts(respoonse.data.posts);
            }
        }
        GetSavedPosts();
        setLoading(false);
    }, [savedPosts]);
    return (
        <div>
            <Sidebar/>
            <SavedPostsStyled>
                <h1>Saved posts</h1>
                {savedPosts.map((savedPost) => (
                    <SavedPost savedPost={savedPost} posts={posts} setPosts={setPosts} setDetailedPost={setDetailedPost} savedPosts={savedPosts}/>
                ))}
            </SavedPostsStyled>
        </div>
    )
}

const SavedPostsStyled = styled.div`  
     margin-top: 3%;
    margin-left: 22%;
    padding: 1rem;
`

export default SavedPosts
