import React from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import firebase from 'firebase/app'
import axios from 'axios'
import SavedPost from './SavedPost'
import {useUserContext} from '../AuthContext'

function SavedPosts({posts, setPosts, setDetailedPost, savedPosts, setSavedPosts}) {
    const {user} = useUserContext();
    const [loading, setLoading] = React.useState();

     // get the token of the current user to be used in for authenticating the user to use the events api 
     React.useEffect(() => {
        setLoading(true);
        const GetSavedPosts = async () => {
            if(user){
                const respoonse = await axios({
                method: "get",
                url: "/posts/profile/savedPosts",
               
                }, {withCredentials: true});
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
                <div className="cards">
                    {savedPosts.map((savedPost) => (
                        <SavedPost savedPost={savedPost} posts={posts} setPosts={setPosts} setDetailedPost={setDetailedPost} savedPosts={savedPosts}/>
                    ))}
                </div>
            </SavedPostsStyled>
        </div>
    )
}

const SavedPostsStyled = styled.div`  
     margin-top: 3%;
    margin-left: 22%;
    padding: 1rem;
    .cards {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-template-rows: auto;
    }

`

export default SavedPosts
