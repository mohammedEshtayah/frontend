import '../settingHilal.css'
import React, { Component } from 'react';
import serializeForm from  'form-serialize';

export default class DeleteHospital extends React.Component{
    delete_hosp=(e)=>{
        e.preventDefault();
        
        var fromData=serializeForm(document.querySelector('#delete_hosp'),{hash: true, empty: true})
    
        fetch('http://localhost:3003/settingHilal/delete_hosp',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(fromData)}).then(res=> res.json()).then(res=>res)
            
       console.log('valess',fromData);
    }
    render(){
        return(
            <form id ='delete_hosp'onSubmit={this.delete_hosp.bind(this)}>
            <input type="text"     name="name"      placeholder="Name"        /> <br/>
            <input type="password" name="password"  placeholder="password"   /> <br/> 
            <button type="submit" >Delete Hospital</button>
            </form>

        );
    }
}