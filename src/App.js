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

function App() {
  const retreive = localStorage.getItem("event");
  const parsed = JSON.parse(retreive);
  const [posts, setPosts ] = React.useState();
  const [detailedPost, setDetailedPost] = React.useState(parsed || {});
  const [token, setToken] = React.useState();
  const [loading, setLoading] = React.useState();

  // get the token of the current user to be used in for authenticating the user to use the events api 
  React.useEffect(() => {
    setLoading(true);
    const getToken = async () => {
        if(firebase.auth().currentUser){
            const decoded = await firebase.auth().currentUser.getIdToken(true);
            const respoonse = await axios({
              method: "get",
              url: "http://localhost:3001/events",
              headers : {
                  'authtoken': decoded
                  }
              });
              setPosts(respoonse.data);
              setToken(decoded);
          }
      }
    getToken();
    setLoading(false);
}, []);


 
  

  return (
    
    <Router>
      {/* <AuthProvider> */}
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/">
              {!loading && <Dashboard posts={posts} token={token} setDetailedPost={setDetailedPost}/>}
            </PrivateRoute>

            <PrivateRoute path="/savedposts" component={SavedPosts}/>
            <PrivateRoute path="/profile">
              <UserProfile/>
            </PrivateRoute>

            <PrivateRoute path="/createpost">
              <CreatePost/>
            </PrivateRoute>
            <PrivateRoute path="/details">
              <DetailedPostView post={detailedPost}/>
            </PrivateRoute>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </div>
      {/* </AuthProvider> */}
    </Router>
    
    
  );
}

export default App;
