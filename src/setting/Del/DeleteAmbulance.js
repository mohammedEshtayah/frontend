import '../settingHilal.css'
import React, { Component } from 'react';
import serializeForm from  'form-serialize';
export default class DeleteAmbulance extends React.Component{
    delete_amb(e){
        e.preventDefault();
        var fromData=serializeForm(document.querySelector('#delete_amb'),{hash: true, empty: true})
    
        fetch('http://localhost:3003/settingHilal/delete_amb',{method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(fromData)}).then(res=> res.json()).then(res=>res)
    }
    render(){
        return(
            <form id ='delete_amb'onSubmit={this.delete_amb.bind(this)}>
                    <input type="text"     name="name"      placeholder="Name"        /> <br/>
                    <input type="password" name="password"  placeholder="password"   /> <br/> 
                    <button type="submit" >Delete ambulance</button>
                    </form>

        );
    }
}
/** */