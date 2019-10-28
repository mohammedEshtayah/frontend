import React, { Component } from 'react';
import './Work_hours.css'
import serializeForm from  'form-serialize';
 
//import logo from '.../logo.svg';
import { BrowserRouter as Router,withRouter, Route,Switch,Redirect} from 'react-router-dom'
 export default class Work_hours extends Component{
     constructor(props){
         super(props)
         this.state={
           nameAmb:[],
           hours_work:[],
           count:0
         }
     }
     componentDidMount(){
         fetch('http://localhost:3003/amb/Work_hours/',{
             method:'GET',headers:{'Content-Type':'application/json'}})
         .then(res=>res.json()).then(res=>{ this.setState({nameAmb:res})} )
     }
     get_hoursWork(data){
          
          
        fetch('http://localhost:3003/Work_hours/',{
            method:'post', headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:data})})
         .then(res=>res.json()).then(res=>{ this.setState({hours_work:res,count:0})} )
      }
    render(){ 
        return(
             
            <div>
                <div className='nameAmb'>
                    
                    { this.state.nameAmb.map(name=>(
                        <h1 key={name}   onClick={this.get_hoursWork.bind(this,name)} >{name}</h1>
                    )) }

                </div>
                <div className="workHours">
                    
                    {this.state.hours_work.map(HW=>(
                    
                        <div key={this.state.count++}  >

                            <div className="viewHours" >
                                <div className="count">
                                    <h1 >{this.state.count}</h1> 
                                </div>
                                <div className="hours"> 
                                    <h1 >&nbsp; Work started :{HW["Work started"]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; End time :{ HW["End time"]}</h1>
                                </div>
                                
                              
                            </div>
                            
                            <div>
                                <br/>
                            </div>
                        </div>
                        
                    ))}

                </div>
            </div>
        )
    }
     
}
 // withRouter (Work_hours)