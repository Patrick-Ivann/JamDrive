import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



import { Provider } from "react-redux";
import store from './store';
import jwt_decode from 'jwt-decode';

import PrivateRoute from './components/common/PrivateRoute'


import Header from './components/layout/Header';
import Main from './components/Main';
import ErreurApp from './components/common/ErreurApp';
import  Login  from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';

class App extends Component {

  componentDidMount = () => {
    //check si il y a un token

    if (localStorage.jwtToken) {

      setAuthToken(localStorage.jwtToken);

      const decoded = jwt_decode(localStorage.jwtToken)

      //store.dispatch(setCurrentUser(decoded))

      //chekc si le truc a expiré

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {

        store.dispatch(logoutUser())
    


        window.location.href = '/'

      }
    }

  }
  


  
  
  render() {
    return (
      <Provider store={store} >
      
      <Router>
      
      <div>
      
      <Header/>
      <ErreurApp></ErreurApp>

      <Route exact path="/" component={Login} />

      <Route exact path='/prosits' component={Main} />
      <Switch>

      <PrivateRoute exact path='/prositsGod'  component={Main}/>
   

      </Switch>

      </div>
      </Router>
      
      </Provider>
      
    );
  }
}

export default App;
