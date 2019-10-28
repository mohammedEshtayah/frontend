import logo from '../logo.svg';
import React from "react";
import './Request.css'
import Button from '@material-ui/core/Button';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
 import HomeHilal from '../home/HomeHilal';
  import Navigation from '../Navigation';
  import Toolbar from '@material-ui/core/Toolbar'
 import AppBar from '@material-ui/core/AppBar';
 import HamburgerMenu from 'react-hamburger-menu'
 
 import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap'; 
 import socketIOClient from "socket.io-client";
  //import App from './App';
  import CheeseburgerMenu from 'cheeseburger-menu'
  const sockets = socketIOClient('http://localhost:3003/');
  class Request extends React.Component {
  constructor(props){
    super(props);
    this.state={ 
      user:this.props.user,
      i:0,
      Amb: [ ],
      list: [  ],
      History_patient:'',
      data_patient :[],
      
    }
    //this.history_view= this.history_view.bind(this);

  }  
   //  this.state.socket.emit('user', this.state.user.user)
    // this.state.socket.on('ambulance', (datas) => { this.setState({  Amb :datas }); });
  
  componentDidMount(){
    fetch("http://localhost:3003/History-patient-hospital" , {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    
    })  .then(res => res.json())
     .then(data => {
       
          this.setState({  list:data , data_patient:data });
         //console.log(data[0].patient[0].name)
         
      }); 
     
      this.state.Amb= this.state.list.datas
  }
   
  openMenu() {   this.setState({ menuOpen: true }) }

  closeMenu() {   this.setState({ menuOpen: false })  }

  getpation=({id,email})=> <li><p>{this.state.user.user}</p></li> 

  history_view=(data )=>{
    console.log(data)
   { this.state.list=this.state.data_patient.filter(item=>item.history == data )
    }console.log('history',this.state.list )
    this.setState({ list:this.state.data_patient.filter(item=>item.history == data )
    })
     
  }
  handleInputChange=(e)=>{
//return<h1>hhhhhhhhhhhhhhhh</h1>
console.log(e.target.value)
/*
for (const item of  search_patient ){
  if(true){}
}*/

  }
 render(){
  
  return (
    
<div >   

    <div className="nav">     
    <Navigation  Navigation authenticate={this.props.authenticate}  />
    </div> 

  <div className="a">
       <div className="Rsidebar">
          {
            this.state.data_patient.map(item=>(
              <h1 key={item.history} href="#"   onClick={this.history_view.bind(this,item.history) }>{item.history}</h1>
            ))
            }
        </div>
    
        <div className="bady"   >   
         <div className="Search">
           <div className="Search-input"  > 
            
              <input className="Searchinput"  placeholder="Search for..." 
               ref={input => this.search = input}
               onChange={this.handleInputChange} />
             
           </div>
            <div > <Button className="Searchbotton" >Search</Button> </div>
         </div>
         
            
          {this.state.list.map(element => ( 
                element.patient.map((Datas_patient)=>(
        
                  <div className="data_patient">
                    {//console.log(Datas_patient.datas)
                     }
                                            
                  <div className="part1">
                   <h1>name:{Datas_patient.name}</h1>
                   <h1>age:{Datas_patient.datas.age}</h1>
                   <h1>doctor:{Datas_patient.datas.doctor}</h1> 
                   <h1>phone:{Datas_patient.datas.phone}</h1>
                  </div>
      
                  <div className="part2">{/*pills*/}
                     <h1>blood_type:{Datas_patient.datas.blood_type}</h1>
                     <h1>pills:{Datas_patient.datas.pills}</h1>
                     <h1>need_process:{Datas_patient.datas.need_process}</h1>
                     <h1>process_before:{Datas_patient.datas.process_before}</h1>
                  </div>
                  <h1>info:{Datas_patient.datas.info}</h1>
                 </div>
                 ))
            
           ))//foreach
            
             }

        </div>
    </div>
    
    
   </div>
   
  
    
   );
 }
}

export default Request;
