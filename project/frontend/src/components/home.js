import * as React from 'react';
import { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, createTheme, ThemeProvider} from '@material-ui/core';
import {VideoBg , TextH1, TextP} from "./Design/design"
import {Link} from 'react-router-dom';
import Video from "./Design/Videos/Artlogo.mp4"



const tema = makeStyles({
    text:{
        color: 'rgb(0, 0, 0)',
    },
    root:{
        justifyContent: 'center',  
        color: 'rgb(255, 255, 255)',
        width: "100%",
    },
    paper:{
        justifyContent: 'center',  
        width:"100%",
        height: 544,
        boxShadow: '0 3px 5px 2px (45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 30,
        position: 'relative',
        
    },
    paper2:{
        
        width: "100%",
        height: 300,
        boxShadow: '0 3px 5px 2px (45deg, #FE6B8B 30%, #FF8E53 90%)',   
        position: 'relative',
        float: 'right',
        marginTop: 25
    },
    button:{
        marginTop: 20
    }, 
})

const theme = createTheme ({
    palette:{
        primary:{
            main: '#9765F4'
        }
    }
})

export default function Home(){
    const classes = tema();
    const [hover, setHover] = useState(false);

    const onHover = () =>{
        setHover(!hover)
    }

    return(
        <div> 
             
       
            <div id className={classes.paper}>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>

                <div style={{position:"absolute", left: 415, top: 60}}>
                <TextH1 > NFT Platform</TextH1> 

                    <TextP > Be a part of the decentralized finance world, dont hesitate!</TextP>
            
                    <ThemeProvider theme ={theme}>
                        <Button variant= "contained" color = 'primary' onMouseEnter={onHover} onMouseLeave={onHover} component={Link} to="/createnft">
                            Get started 
                        </Button>
                    </ThemeProvider>
                    </div>
            </div>

    
        
        </div>
    )
}