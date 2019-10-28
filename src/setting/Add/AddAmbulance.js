import '../settingHilal.css'
import React, { Component } from 'react';
import serializeForm from  'form-serialize';

export default class AddAmbulance extends React.Component{
    Add_amb(e){
        e.preventDefault();
        var fromData=serializeForm(document.querySelector('#Add_amb'),{hash: true, empty: true})
    fetch('http://localhost:3003/settingHilal/Add_amb',{
        method:'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(fromData)}).then(res=> res.json()).then(res=> {console.log('res')})
       
    }
    render(){
        return(
            <form id="Add_amb" onSubmit={this.Add_amb.bind(this)}>
                        
                <h4>name of the ambulance</h4>
                <input type="text"     name="name"      placeholder="Name"        />  
                <h4>email of the ambulance</h4>
                <input type="email"    name="email"     placeholder="Email"      />   
                <h4>phone of the ambulance</h4>
                <input type="text"     name="phone"     placeholder="phone"      /> <br/> 
                <h4>location of the ambulance</h4>
                <input type="text"     name="location"  placeholder="location"   /> <br/> 
                <h4>password of the ambulance</h4>
                <input type="password" name="password"  placeholder="password" autoComplete="new-password" />  /> <br/> 
                <button type="submit" >Add ambulance</button>
                </form>

        );
    }
}