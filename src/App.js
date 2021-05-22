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
import UpdateUserForm from './components/UserUpdateForm';

function App() {
  const [posts, setPosts ] = React.useState();
  const [detailedPost, setDetailedPost] = React.useState();
  

  // JSON.parse(localStorage.getItem('detailedPost')

  

  return (
    <Router>
        <div className="App">
          
          <Switch>
            <PrivateRoute exact path="/" component={() => <Dashboard posts={posts} setPosts={setPosts} setDetailedPost={setDetailedPost} />}/> 

            <PrivateRoute path="/profile" component={() => <UserProfile setDetailedPost={setDetailedPost}/>}/>
      
            <PrivateRoute path="/createpost" component={() => <CreatePost />}/>
              
            <PrivateRoute path="/details" component={() => <DetailedPostView detailedPost={detailedPost} setDetailedPost={setDetailedPost}/>}/>

            <PrivateRoute path="/updateProfile" component={() => <UpdateUserForm />}/>

            <Route path="/signup" component={Signup}/>

            <Route path="/login" component={Login}/>
          </Switch>
        </div>
    </Router>
    
    
  );
}

export default App;
