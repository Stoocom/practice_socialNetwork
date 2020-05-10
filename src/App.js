import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter, BrowserRouter } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
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
  componentDidMount() {
    this.props.initializeApp()
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
          <Route path='/profile/:userId?' render=
            {() => {
              return (<Suspense fallback={<Loader />}>
                <ProfileContainer />
              </Suspense>)
            }} />
          <Route exact path='/dialogs' render={() =>
            <Suspense fallback={<Loader />}>
              <MyDialogsContainer />
            </Suspense>} />
          <Route exact path='/users' render={() => <UsersContainer />} />
          <Route exact path='/login' render={() =>
            <LoginPage />} />
          <Route exact path='/news' component={News} />
          <Route exact path='/music' component={Music} />
          <Route exact path='/settings' component={Settings} />
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