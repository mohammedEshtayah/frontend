import React, { Component } from 'react';
import logo from './logo.svg';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import render from 'react-dom'
import axios from 'axios';

 import { BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom'
import socketIOClient from "socket.io-client";
import Login from "./home/login";
import HomeHilal from './home/HomeHilal';
import Request from './Request/Request'; 
import Hospital from './home/Hospital'; 
import AddHospital from './setting/Add/AddHospital';
import Work_hours from './Work_hours'
import SettingHilal from './setting/SettingHilal'

//import { browserHistory } from 'react-router';

 export default  class App extends Component { 

  constructor(props) {
    super(props);
    let user = {
      isLoggedIn: true,
      user:'',
      page:'a'
    }

    try {
      let userJsonString = localStorage.getItem("chat-hub");
      if (userJsonString) {
        user = JSON.parse(userJsonString);
      }
    } catch (exception) {
    }

    this.state = 
    { 
      user: user
    };

    this.in_out = this.in_out.bind(this);
  }

  in_out(user) {
    this.setState({
      user: user
    });
 
    localStorage.setItem("chat-hub", JSON.stringify(user));
  }
  // {this.DisplayConditionalHome()}
  render() {
    return (
      <Router>
      <div className="App">
      <Switch>
     
      <Route exact path='/' render={() => 
                    this.state.user.isLoggedIn && this.state.user.user =='Hilal'? 
                      <HomeHilal to="/HomeHilal" HomeHilal authenticate={this.in_out} user={this.state.user}  /> : 
                     
                      this.state.user.isLoggedIn && this.state.user.user !=='Hilal'? 
                      <Hospital to="/hospital" Hospital authenticate={this.in_out} user={this.state.user}  /> : 
                      <Login authenticate={this.in_out} />
                      
                      }/>
 
         
      <Route exact path='/HomeHilal'  render={() => 
              this.state.user.isLoggedIn ? 
              <HomeHilal authenticate={this.authenticate} user={this.state.user}  /> : 
              <Redirect to="/"/> }/>

      <Route exact path='/Request'   render={() => 
              this.state.user.isLoggedIn  ? 
              <Request to="/Request" Request authenticate={this.in_out} user={this.state.user}  /> : 
              <Redirect to="/"/> }/>
                      
      <Route exact path='/settingHilal'   render={() => 
              this.state.user.isLoggedIn ? 
              <SettingHilal to="/settingHilal" SettingHilal authenticate={this.in_out} user={this.state.user}/> : 
              <Redirect to="/"/> }/>
     
     <Route exact path='/settingHilal/AddHospital'   render={() => 
              this.state.user.isLoggedIn ? 
              <AddHospital to="/settingHilal/AddHospital" AddHospital authenticate={this.in_out} user={this.state.user}/> : 
              <Redirect to="/"/> }/>
              
     <Route exact path='/Work_hours'   render={() => <Redirect to="/"/> }/>
      <Route component = {notFound} />
        </Switch>
      </div>
      </Router>
    );
    function notFound() {
      return <h2>notFound</h2>;
    }
  }
  
}