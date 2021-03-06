import React from 'react'
import Signup from './components/Signup'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import DetailedPostView from './components/DetailedPostView';
import UpdateUserForm from './components/UserUpdateForm';
import SavedPosts from './components/SavedPosts';
import {useUserContext} from './AuthContext';


function App() {
  const {fetchCurrentUser} = useUserContext();
  const [posts, setPosts ] = React.useState();
  const [detailedPost, setDetailedPost] = React.useState();
  const [savedPosts, setSavedPosts] = React.useState([]);
  React.useEffect(() => fetchCurrentUser(), []);



  return (

    <Router>
        <div className="App">
          <Switch>
      
            <Route exact path="/" render={(props) => <Dashboard {...props} posts={posts} 
            setPosts={setPosts} setDetailedPost={setDetailedPost} savedPosts={savedPosts} setSavedPosts={setSavedPosts} />} />

            <Route path="/details" render={(props) => <DetailedPostView {...props} />}/>

            <Route path="/signup" component={Signup}/>

            <Route path="/login" component={Login}/>

            <PrivateRoute path="/profile" render={(props) => <UserProfile {...props} setDetailedPost={setDetailedPost}/>}/>
    
            <PrivateRoute path="/createpost" render={(props) => <CreatePost  {...props}/>} />

            <PrivateRoute path="/savedposts" render={(props) => <SavedPosts  {...props} posts={posts} 
            setPosts={setPosts} setDetailedPost={setDetailedPost} savedPosts={savedPosts} setSavedPosts={setSavedPosts} /> }/>
        

            <PrivateRoute path="/updateProfile" render={(props) => <UpdateUserForm  {...props}/>}/>    
            
           
          </Switch>
        </div>
    </Router>
    
    
  );
}

export default App;
