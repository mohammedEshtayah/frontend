import React, { Component } from 'react';
import serializeForm from  'form-serialize';
import './settingHilal.css'
import AddHouspitl from './Add/AddHospital'
import DeleteHospital from './Del/DeleteHospital'
import AddAmbulance from './Add/AddAmbulance'
import DeleteAmbulance from './Del/DeleteAmbulance'
import Sidebar from "react-sidebar";

//import logo from '.../logo.svg';
import { BrowserRouter as Router,withRouter, Route,Switch,Redirect} from 'react-router-dom'
import { Grid } from '@material-ui/core';
const mql = window.matchMedia('(min-width: 600px)','width:300px');
class SettingHilal extends Component{

constructor(props){
    super(props);
    this.state={
        page:'Add_hosp',
        sidebarDocked: mql.matches,
        sidebarOpen: false
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
}

logout(e) {
    e.preventDefault();
    this.props.authenticate({isLoggedIn: false});
}


componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: false });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

   
render(){
    return(
         
            <div >
            
                <Sidebar   
        sidebar={ <div>
          <h1>ssssssss</h1>
          <h1>ssssssss</h1>
     
        </div>
         }
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        transitions={true}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "red" ,width:'300px'} }}
      >
         <button onClick={() => this.onSetSidebarOpen(false)}>
          Open sidebar
        </button>
      </Sidebar>

                </div>
            
        /**
        <div  className="main">
                 <Grid container  spacing={23}>
                 <Grid item xs={3}>    
                 <div className="sideList">
            <ul>
                 
              <li><h1 onClick={()=>{this.setState({page:'Add_hosp'})}}>Add hospital</h1></li>
              <li><h1 onClick={()=>{this.setState({page:'Del_hosp'})}}>Delete Hospital</h1></li>
              <li><h1 onClick={()=>{this.setState({page:'Add_amb'})}}>Add ambulance</h1></li>
              <li><h1 onClick={()=>{this.setState({page:'Del_amb'})}}>Delete ambulance</h1></li>
              <li><h1 onClick={ ()=>{ this.props.history.push('/Work_hours')}}>work hours</h1></li>
              <li><h1 onClick={this.logout.bind(this)}>sign out</h1></li>
            </ul>
          </div> 
      
      </Grid>
                 <Grid item xs={9}>
                 <div className="bodyA">
                 
                {this.state.page=='Add_hosp'? 
                
                   <AddHouspitl/>
                                   :
                this.state.page=='Del_hosp'?
                 <DeleteHospital/>
                 : 
                this.state.page=='Add_amb'?
                  <AddAmbulance/>
                 : 
               
                this.state.page=='Del_amb'?
                <DeleteAmbulance/>
                 
                 
          
    :null}
            </div>
             
      
                 </Grid>
                 </Grid>
           
           

        </div>
         
         */
   
        )
    }
    
}
export default  withRouter (SettingHilal)
function notFound() {
    return <h2>notFound</h2>;
  }