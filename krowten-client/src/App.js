import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
//components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

//checking if logged in/signed up
let authenticated = false;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //checking if token has expired - has a *1000 value
  if (decodedToken.exp * 1000 < Date.now()) {
    //redirect to login
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  //everything inside Provider has access to store ie state
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute
                  exact
                  path='/login'
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path='/signup'
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
