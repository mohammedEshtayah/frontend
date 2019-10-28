import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router,withRouter, Route,Switch,Redirect,NavLink} from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import './Navigation.css'
 
export default  class Navigation extends Component {
    constructor(props) {
        super(props);
       this.state={
        user:this.props.authenticate }
     
      }
       
    logout(e) {
        e.preventDefault();
        this.props.authenticate({isLoggedIn: false});
      }
     
    render(){

        return(
            <div >
            <AppBar  position="static">
            <div className="bar">  
              <Toolbar    >
                <div className="login" >
                  <Button color="inherit" onClick={this.logout.bind(this)}>Login</Button>
                  
                  </div>
              
              </Toolbar>
              </div>
              </AppBar>
          </div>
        )
    }
}