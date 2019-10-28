import logo from '../logo.svg';
import React, { Component } from 'react';
import SettingHilal from '../setting/SettingHilal'
import './HomeHilal.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import amb from './amb.png'
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router,withRouter, Route,Switch,Redirect,NavLink} from 'react-router-dom'
import { relative } from 'path';
const TOKEN = 'pk.eyJ1IjoibW9oYW1tZWRlc3NodGF5YWgiLCJhIjoiY2pxOTdwNmZuMnphNTN4cHB4ZXo4eGtkNiJ9.CcIHtx6xpE7zJBLb3iIS6A';
const sockets = socketIOClient('http://localhost:3003/');
 class HomeHilal extends Component {
  
constructor(props) {
    super(props);
    this.state = {
      pagess:false,
      viewport: {
        latitude: 32.211419,
        longitude: 35.322909,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        width: '80vw',
        height: '100vh',
      }, mapStyle: "streets-v9",
      style: "mapbox://styles/mapbox/streets-v9",
      amb_Hilal:[],
      item:{ Process_before: '',
      is_danger: '',
      name: '',
      need_process: '',
      phone: 0,
      pills: '',
      state: '' },
      open:false, 
      setOpen :false
     
    };
 
}
handleClickOpen (item){
  if(item)
    this.setState ({  item:item,  setOpen:true});
    console.log(item)
}

componentDidMount() {     
    sockets.emit('amb_Hilal', 'this.state.user.user')
    sockets.on('amb_Hilal', (data) => { this.setState({  amb_Hilal :data });  });
} 

handleClose() {
  this.setState ({  setOpen:false});
}

setting(){ 
   //this.props.history.push('/settingHilal')
   this.setState ({  pagess:true});
} 
logout(e) {
      e.preventDefault();
      this.props.authenticate({isLoggedIn: false});
}
   
render() {
    const {viewport} = this.state;
    if(this.state.pagess==true){
      return (
       <Redirect to={{pathname:"/settingHilal", state: {from: "props.pagess"} }} />
          
    ) 
     }
    return (
      <div  className="row">  
     <div className="sidebarr"  style={{height:'100vh'}}> 
          <div className="listSide" >
                
            <ul> 
               {this.state.amb_Hilal.map(item =>(
                <p key={item.id}  onClick={this.handleClickOpen.bind(this,item.patients) }> {item.name } </p>
               ))} 
            </ul>
           </div>
         
 
         <div className="buttomNav"> 
          <Button color="inherit" onClick={this.logout.bind(this)}>Login</Button>
          <Button color="inherit"  onClick={this.setting.bind(this) }>setting</Button>
        
</div>  
        </div> 
     
         <div className="mapp" style={{position:'absolute',right:'0',float:'right'}}>
    <MapGL  
        {...viewport}  mapStyle={this.state.style}    mapboxApiAccessToken={TOKEN}  
        onViewportChange={(viewport) => this.setState({viewport})} >
        
        <div className="nav" style={{ position:'absolute',top:'0', right: '0' }} >
          <NavigationControl onViewportChange={(viewport) => this.setState({ viewport })}  />
          <button className="btn btn-primary float-right logout-button" onClick={this.logout.bind(this)}>Logout</button>
			  </div>

        {this.state.amb_Hilal.map(amb_Hilal=>(
          <Marker  key={amb_Hilal.id}  latitude={  amb_Hilal.latlng.lat} longitude={ amb_Hilal.latlng.lng} >  
          <button  onClick={this.handleClickOpen.bind(this,amb_Hilal.patients) }>
            <img className="imageMarker" src={amb}></img>
          </button> 
          </Marker>
        ))} 
      
        <Dialog open={this.state.setOpen}  keepMounted onClose={this.handleClose.bind(this)}
          aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description"
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
           
          
    ); //render
  }
} 

export default  withRouter (HomeHilal)
 