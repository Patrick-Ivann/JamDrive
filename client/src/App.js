import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



import { Provider } from "react-redux";
import store from './store';




import Header from './components/layout/Header';
import Main from './components/Main';

class App extends Component {


   render() {
    return (
      <Provider store={store} >
        
        <Router>

          <div>
            <Header/>
            <Main />
          </div>
        </Router>
      
      </Provider>

    );
  }
}

export default App;
