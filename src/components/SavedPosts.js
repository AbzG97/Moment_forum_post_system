import React from 'react'
import Sidebar from './Sidebar'

function SavedPosts({message}) {
    return (
        <div style={{marginLeft: "20%"}} className="savedPosts">
           
            <h1>Saved Posts</h1>
            <h2>{message}</h2>
            
        </div>
    )
}

export default SavedPosts
