import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



import { Provider } from "react-redux";
import store from './store';

import PrivateRoute from './components/common/PrivateRoute'


import Header from './components/layout/Header';
import Main from './components/Main';
import ErreurApp from './components/common/ErreurApp';
import  Login  from './components/auth/Login';

class App extends Component {


  
  
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
