import logo from '../logo.svg';
import React from "react"; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'; 
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Route, Link,withRouter, BrowserRouter ,Redirect, Router } from 'react-router-dom'
import { createHashHistory } from 'history'
import HomeHilal from '../home/HomeHilal';
import Navigation from '../Navigation';
import amb from './amb.png'
  import Grid from "@material-ui/core/Grid";
  import MapGL, {Marker, Popup,Layer, Feature, NavigationControl} from 'react-map-gl';
 import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap'; 
 import socketIOClient from "socket.io-client"; 
 import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SideBar from 'react-fixed-sidebar';

import Request from '../Request/Request'
import './HomeHilal.css'
const TOKEN = 'pk.eyJ1IjoibW9oYW1tZWRlc3NodGF5YWgiLCJhIjoiY2pxOTdwNmZuMnphNTN4cHB4ZXo4eGtkNiJ9.CcIHtx6xpE7zJBLb3iIS6A';
const sockets = socketIOClient('http://localhost:3003/');
//export const history = createHashHistory()
  class Hospital extends React.Component {
   
  constructor(props){
    super(props);
    let  dialogs={
      open:false, setOpen :false
    };
    this.state={ 
      viewport: {
        latitude: 32.211419,
        longitude: 35.322909,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        width: '80vw',
        height: '100vh',
      },  style: "mapbox://styles/mapbox/streets-v9",
      user:this.props.user,
    ambulance: [],
    item:{},
      name:'',
      showPopup:false,
      lat:35.322909,
      lng:0,
      amb:[],
      open:false, 
      setOpen :false
     
      
    
    }
    
  
  }
logout(e) {
    e.preventDefault();
    this.props.authenticate({isLoggedIn: false});
}
 
componentDidMount(){
    /*fetch("http://localhost:3003/getAmb" , {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    
    })  .then(res => res.json())
     .then(data => {
   
       this.setState({  lists :data });
       console.log('rrrrrr',data)
      });*/
  
      sockets.emit('Hospital', this.state.user.user)
     sockets.on('ambulances', (data) => { this.setState({  ambulance :data });  console.log('rrrrrr',data)});
      
      
}

Request = (e) => {
    //const history = createHistory();
  //  / return <Redirect to='/Request' />
   //this.props.Request.push('/Request');
   // history.push('/Request')
  //  return <Redirect  to="/Request"  /> 
   // return <Request to="/Request" Request authenticate={this.in_out} user={this.state.user}  /> 
      this.props.Redirect({page:"/Request"});
      
    //this.context.router.push('/');
 // return <Redirect to="/Request" component={Request} /> 
 
  //browserHistory.push('/Request')
  /*
    return (
     
  <Route exact path='/Request' 
  render={() => 
    this.state.user.isLoggedIn ? 
     <Request to="/Request" Request authenticate={this.in_out} user={this.state.user}  /> : 
      <Redirect to="/"/> }/>
  
    )
    */
  
} 
    
    

handleClickOpen (item){
  this.setState ({  item:item,  setOpen:true});
  console.log(item)
}

handleClose() {
    this.setState ({  setOpen:false});
}

   
showPopup(ev){  
    //this.setState({showPopup:!this.state.showPopup,lat:ev.target.value}) ;
    this.setState({ lat:ev.target.value}) ;
    console.log(this.state.showPopup,this.state.lat)
    console.log(ev.target.value)
}  
         
    
 render(){ 
  const {viewport} = this.state;
  return ( 
    <div > 
 
     <div className="sidebarr">
     <div className="listSide" >
      <div>      
        <ul>
        {this.state.ambulance.map(item =>(
          item.patients?
         <p key={item.id}>
         {item.name     } 
         {    this.state.name }  </p>
     :
          <a key={item.id}></a>    )
      )} 
           
    </ul>
     </div>
      </div>  
      <div className="buttomNav"> 
        <Button color="inherit" onClick={this.logout.bind(this)}>Login</Button>
        <Button color="inherit" onClick={() => this.props.redirect({page:'Request'})}>Request</Button>
                  
      </div>
  
    </div> 
   <div className="map" style={{position:'absolute',right:'0',float:'right'}}>
      <MapGL  {...viewport}  mapStyle={this.state.style} mapboxApiAccessToken={TOKEN} onViewportChange={(viewport) => this.setState({viewport})} >
      <div className="Control" style={{float:'right'  }} > <NavigationControl onViewportChange={(viewport) => this.setState({ viewport })}  /> </div>
        
     {this.state.ambulance.map(item =>(
       <div  key={item.id}> 
        <Marker    latitude={  item.latlng.lat} longitude={ item.latlng.lng} >  
         <button onClick={this.handleClickOpen.bind(this,item.patients) }> <img className="imageMarker" src={amb}></img> </button> 
        </Marker>
      </div>
     ))} 
          
      <Dialog open={this.state.setOpen}  keepMounted onClose={this.handleClose.bind(this)}
        aria-labelledby="alert-dialog-slide-title"  aria-describedby="alert-dialog-slide-description"
      >
       <DialogTitle id="alert-dialog-slide-title">{this.state.item.name}</DialogTitle>
       <div> 
          phone={this.state.item.phone}
         <br></br>Pills={this.state.item.Pills}  
         <br></br> Process_before={this.state.item.Process_before} 
         <br></br>age={this.state.item.age}
         <br></br>is_danger={this.state.item.is_danger}
         <br></br> namePatients={this.state.item.namePatients}
         <br></br> need_process={this.state.item.need_process}  
         <br></br>state={this.state.item.state}
        </div>
      </Dialog>       
    
    </MapGL>
   </div>
  
    
   </div>
  );
}
}
export default  (Hospital)
