import '../settingHilal.css'
import React, { Component } from 'react';
import serializeForm from  'form-serialize';
export default class AddHospital extends React.Component{
    add_hosp(e){
        e.preventDefault();
        var fromData=serializeForm(document.querySelector('#add_hosp'),{hash: true, empty: true})
    
        fetch('http://localhost:3003/settingHilal/AddHospital',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(fromData)} ).then(res=> res.json()).then(res=> {console.log(res.name)})
        
       
       
       console.log(fromData)
     //console.log(this.refs.email.value );
    
    }
    render(){
        return( 
            <form id="add_hosp" onSubmit={this.add_hosp.bind(this)}  >         
                <input type='hidden' value='something'/>
                <h4>name of the hospital</h4>
                <input type="text"     name="name"      placeholder="Name"         />  
                <h4>email of the hospital</h4>
                <input type="email"    name="email"   placeholder="Email"   />   
                <h4>phone of the hospital</h4>
                <input type="text"     name="phone"     placeholder="phone"    /> <br/> 
                <h4>location of the hospital</h4>
                <input type="text"     name="location"  placeholder="location"   /> <br/> 
                <h4>password of the hospital</h4>
                <input type="password" name="password"  placeholder="password"  autoComplete="new-password" /> <br/> 
                <button type="submit" >Add Hospital</button>
            </form> 
        );
    }
}
