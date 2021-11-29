import {AppBar, Toolbar, createTheme, InputBase, ThemeProvider, IconButton, Button} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {AccountCircle} from '@material-ui/icons'
import {makeStyles, styled, alpha } from '@material-ui/core/styles';
import './App.scss';
import {Link} from 'react-router-dom';
import {AccountContext} from "./components/UseContext/Account_Context"
import HomeIcon from '@mui/icons-material/Home';
import { useContext} from 'react';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    text:{
        color: 'rgb(255, 255, 255)',
    },
    grow: {
        flexGrow: 0.05,
      },
      search_: {
        marginTop: 10,
      },

    rightText: {
        align: "left"
      },
});

const theme = createTheme ({
    palette:{
        primary:{
            main: '#9765F4'
            
        }
    }
})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

function Navbar({props}) {
    const classes = useStyles()
    const {account_address} = useContext(AccountContext)

    const {setSearchinput} = useContext(AccountContext)

    const {changeIcon} = useContext(AccountContext)

    const handle_input = (e) =>{
        console.log("Current search input", e.target.value)
        setSearchinput(e.target.value)
    }
    
    
  return (
<div className="text">

        <ThemeProvider theme ={theme}>
            <AppBar position="static" color = 'primary' >
                    <Toolbar className={classes.text}> 

                        <Typography align ="right" color ="primary">
                        
                            {changeIcon?  <IconButton  component={Link} to={`/profile`}> <AccountCircle className={classes.text}/> </IconButton> : <IconButton> <HomeIcon className={classes.text}/> </IconButton>}
                        
                        </Typography>
                        
                        <Typography className={classes.grow}align ="right">    
                            
                            <Button className={classes.text} variant="h5" component={Link} to="/marketplace"> MarketPlace </Button> 
                        </Typography>

                        
                       { changeIcon ? <Typography className={classes.grow} align ="right"> <Button className={classes.text} variant="h5" component={Link}  to="/createnft"> disconnect</Button>  </Typography>: <Typography className={classes.grow} align ="right"> <Button className={classes.text} variant="h5" component={Link}  to="/createnft"> connect</Button>  </Typography>} 
                        
                        <Typography className={classes.grow} align ="right">
                            {account_address} 
                        </Typography>

                        <div style={{position: 'absolute', left: 1050}}>

                        <SearchIcon style={{position: 'absolute', left: -15}}/>

                            <Search>
                            
                            <StyledInputBase
                            placeholder="Search…"
                            onChange={handle_input}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        
                        </div>
                     
                        
                    </Toolbar>
            </AppBar>

            </ThemeProvider>
        
    
</div>
   
  );
}

export default Navbar;