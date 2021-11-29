import './App.scss';
import Marketplace from './components/marketplace';
import Navbar from './navbar';
import {BrowserRouter as  Switch, Route} from 'react-router-dom';
import { AccountProvider } from './components/UseContext/Account_Context';
import {createTheme, ThemeProvider} from '@material-ui/core'
import Connect from './components/User/connect';
import { ChainId, DAppProvider} from '@usedapp/core'
import Profile from './components/User/profile';
import { AccountContext } from './components/UseContext/Account_Context';
import {useContext} from 'react';
import Home from './components/home';

const config = {
  supportedChains: [ChainId.Localhost],
  notifications:{
    expirationPeriod: 1000,
    checkInterval: 1000
  }
}

const theme = createTheme ({
  palette:{
      primary:{
          main: '#738cff'
      }
  }
})


function App() {

  return (
    <div className="App">
      <DAppProvider config = {config}> 
          <AccountProvider>
              <ThemeProvider theme ={theme}>
                <Switch> 
                  <Navbar/>
                  <Route exact path = "/" component = {Home}/> 
                  <Route exact path = "/marketplace" component = {Marketplace}/> 
                  <Route exact path = "/createnft" component = {Connect}/> 
                  <Route exact path = "/profile/" component = {Profile}/> 

                </Switch>
              </ThemeProvider>
            </AccountProvider>
          </DAppProvider>
    </div>
  );
}

export default App;
