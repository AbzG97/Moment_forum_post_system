import React from 'react'
import Signup from './components/Signup'
import {AuthProvider} from './AuthContext'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Cards from './components/Cards';
import SavedPosts from './components/SavedPosts';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/> 
            <PrivateRoute path="/savedposts" component={SavedPosts}/>
            <PrivateRoute path="/profile" component={UserProfile}/>
            <PrivateRoute path="/createpost" component={CreatePost}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
    
    
  );
}

export default App;
