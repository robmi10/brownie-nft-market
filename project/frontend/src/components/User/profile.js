import {Tab, Paper} from '@material-ui/core'
import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import Dashboard from './dashboard';
import Create from './create';

const theme = makeStyles({
    text:{
        color: 'rgb(0, 0, 0)',
    },
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center', 
        arginTop: 20
    },
    paper:{
        height: 400,
        width: 500,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px (45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 10,
        position: 'relative',
        marginTop: 50 ,
    },
    button:{
        marginTop: 20
    },
})

export default function Profile(){
    const [value, setvalue] = React.useState(0)

    const classes = theme();
    const handle_change = (e, value) =>{
        setvalue(value)
    }

    return(
        <div >
        <TabContext value={value}>
            
                <TabList onChange ={handle_change} aria-label ="Menu">
                    
                    <Tab label ="Dashboard" value={0} className={classes.text}></Tab>
                    <Tab label ="Create" value={1} className={classes.text}></Tab>

                </TabList>
                        <TabPanel value={0} className={classes.text}>
                                <Dashboard/>
                        </TabPanel> 
                                 
                        <TabPanel value={1} className={classes.text}>
                                <Create/>
                        </TabPanel>
                
        </TabContext>

        </div>
    )
}