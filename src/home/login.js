import React, { Component } from 'react';
import logo from '../logo.svg';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import render from 'react-dom'
import axios from 'axios';
import './login.css'; 
 import { Redirect,BrowserRouter as Router, Route, Link,Switch ,NavLink } from "react-router-dom";
 import socketIOClient from "socket.io-client";

import HomeHilal from './HomeHilal';
 import Request from '../Request/Request'; 
 const io = require('socket.io-client');  
 const socket = io.connect('http://localhost:3003');
 socket : socketIOClient('localhost:3003')
 export default  class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
   
      user: '',
      pass: '', 
      fireRedirect: false ,          
      isLoaded: false,
      item: {title:''},
      response: false, 
       //socket : socketIOClient('localhost:3003'),
      color: 'white',
      point:''
    };
 
  
      
      }
  send = () => {
   const socket = socketIOClient(this.state.endpoint);
    // socket.emit('ambulance', 'this.state.point') // change 'red' to this.state.color
    socket.on('ambulance', (point) => {
          
      console.log(point+'mo')
    
    })
    setInterval(this.send(), 1000)
   }
 
 
  
componentDidMount () {
    // axios.post('http://localhost:3003/create', {user:this.state.user});
      // setInterval(this.send(), 1000)
        socket.on('ambulance', (point) => {  console.log(point.lat+'mo')})
      
       
 }
userChange(event) {
   this.setState({user: event.target.value});
 }
passwordChange(event) {
     this.setState({pass: event.target.value});
 
 }
login(e) {
       e.preventDefault();
       
       
      //  this.props.history.push('./Request/Request');
      fetch('http://localhost:3003/login', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         user: this.state.user,
         password :this.state.pass
        })
       }).then((response)=> {
        if (response.status == 200  ) {
        
          localStorage.setItem('user',this.state.user)
 
            this.props.authenticate({
            user: this.state.user,
            isLoggedIn: true,
            page:this.state.user
            });
    
         }   });
        
       
 }
      
render() {
    return ( 
      <div  className="mohammed" > 
  
   
  <div >
  <div  className="f" >
    
          <form    >
              <div  >
                <label className="label">User Address</label>
                <div  >
                  <input  onChange={this.userChange.bind(this)} type="user" name="user"    />
                </div>
              </div>
              <div >
                <label className="label">Password</label>
                <div  >
                  
                  <input   type="password" onChange={this.passwordChange.bind(this)} name="password"   /*required*/ />
                </div>
              </div>
              <div >
              <button type="submit" onClick={this.login.bind(this)}  >Login</button>
           </div>
            </form>
          </div>
    </div>   
       
      </div>    );
  }
}
function notFound() {
  return <h2>notFound</h2>;
}
 
 