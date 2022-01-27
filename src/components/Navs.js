
import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import { AppBar,Toolbar,IconButton,Button,Typography } from '@mui/material';
import * as Icon from 'react-bootstrap-icons';



export class Navs extends Component {
    render() {
      
      //  const arr = JSON.parse(localStorage.getItem('userdetails'));;
      //  console.log(arr)
        return (

           <>
            
            <Box sx={{ flexGrow:1 }} >
               
               
             <AppBar position="static">
             <Toolbar>
             <IconButton size="large" edge="start"  color="inherit" aria-label="menu" sx={{ mr: 2 }}>
           
              </IconButton>
   
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
         HOME
     
            <Button sx={{mr:5}}  color="inherit" style={{marginLeft:"50px"}}></Button>
            <i className="text-warning">Welcome :</i> <i><Icon.Person circle/></i> {localStorage.getItem('userdetails')}
          </Typography>
          {/* <Link to="/tabledata" style={{color:"#f9fbe7",marginRight:"15px",color:"pink",fontWeight:"bold"}}>TableData</Link> */}
          <Link to="/" style={{color:"yellow",fontWeight:"bold"}}>Logout</Link>
        
         
        
          </Toolbar>
      </AppBar>
      
      
    </Box>    
     
         </>
        )
    }
}

export default Navs
