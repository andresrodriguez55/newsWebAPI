import React, {useState} from 'react';
import "./Header.css";
import Drawner from './Drawner';
import logo from './logo.png';
import {useHistory } from 'react-router-dom';
import { WindowSharp } from '@material-ui/icons';

const Header = ({setCategory}) =>{

  const history=useHistory();
  const reload=()=>{history.push("/"); window.location.reload(false); };

  return(
    <div className="nav">
        <div className="icon"> <Drawner setCategory ={setCategory} /> </div>
        <img className="image" 
            style={{cursor: "pointer"}}
            src={logo} 
            onClick={()=>{reload(); }}
            />
    </div>
  );
 };

export default Header;