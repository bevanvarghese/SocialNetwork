import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//components
import Navbar from './components/Navbar';
//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#011e28',
      main: '#022b3a',
      dark: '#345561',
      contrastText: '#fff',
    },
    secondary: {
      light: '#155562',
      main: '#1F7A8C',
      dark: '#4b94a3',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home}></Route>
                <Route exact path='/login' component={login}></Route>
                <Route exact path='/signup' component={signup}></Route>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
