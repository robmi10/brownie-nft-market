import * as React from 'react';
import {makeStyles, CardContent, Grid, Button, Box, Typography } from '@material-ui/core' 
import Auctiondashboard from './Auctiondashboard';
import Selldashboard from './selldashboard';



export default function Dashboard(){

    return(
        <div align="center">    
        
        
        <Auctiondashboard/>
        <Selldashboard/> 
        
        </div>
    )
}