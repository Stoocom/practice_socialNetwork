import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login'
import { connect, Provider } from 'react-redux'
import { initializeApp } from '../src/redux/appReducer';
import { compose } from 'redux';
import Loader from './components/common/Preloader/Loader';
import store from './redux/redux-store';

//import ProfileContainer from './components/Profile/ProfileContainer';
const MyDialogsContainer = React.lazy(() => import("./components/Dialogs/MyDialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
//import MyDialogsContainer from './components/Dialogs/MyDialogsContainer';
class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert("Some error occured");
    //console.error(promiseRejectionEvent);
  } 
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {

    if (!this.props.initialized) {
      return <Loader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path='/' render=
              {() => <Redirect to="/profile" />} />
            <Route path='/profile/:userId?' render=
              {() => {
                return (<Suspense fallback={<Loader />}>
                  <ProfileContainer />
                </Suspense>)
              }} />
            <Route path='/dialogs' render={() =>
              <Suspense fallback={<Loader />}>
                <MyDialogsContainer />
              </Suspense>} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/login' render={() =>
              <LoginPage />} />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='*'
              render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  }
}

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }),
)(App)

const SamuraiJSApp = (props) => {
  return <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
}
export default SamuraiJSApp