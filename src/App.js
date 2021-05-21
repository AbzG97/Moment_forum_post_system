import React from 'react'
import Signup from './components/Signup'
import {AuthProvider} from './AuthContext'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import SavedPosts from './components/SavedPosts';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import DetailedPostView from './components/DetailedPostView';
import firebase from "firebase/app";
import axios from 'axios';
import Sidebar from './components/Sidebar';

function App() {
  const [posts, setPosts ] = React.useState();
  const [detailedPost, setDetailedPost] = React.useState();
  

  // JSON.parse(localStorage.getItem('detailedPost')

  

  return (
    <Router>
        <div className="App">
          
          <Switch>
            <PrivateRoute exact path="/">
              <Dashboard posts={posts} setPosts={setPosts} setDetailedPost={setDetailedPost}/>
            </PrivateRoute>

            <PrivateRoute path="/savedposts" component={SavedPosts}/>

            <PrivateRoute path="/profile">
              <UserProfile setDetailedPost={setDetailedPost}/>
            </PrivateRoute>

            <PrivateRoute path="/createpost">
              <CreatePost/>
            </PrivateRoute>

            <PrivateRoute path="/details">
              <DetailedPostView detailedPost={detailedPost} setDetailedPost={setDetailedPost}/>
            </PrivateRoute>

            <Route path="/signup" component={Signup}/>

            <Route path="/login" component={Login}/>
          </Switch>
        </div>
    </Router>
    
    
  );
}

export default App;
