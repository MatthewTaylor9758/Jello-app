import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { setUser } from './store/auth'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginNavbar from './components/LoginNavbar';
import Boards from './pages/Boards';
import BoardPage from './pages/BoardPage'
import { AuthRoute, ProtectedRoute } from './components/utils/Routes';
import { loadUserBoards } from './store/boards'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/session/current_user");
      if (res.ok) {
        res.data = await res.json(); // current user info
        dispatch(setUser(res.data.user))
        dispatch(loadUserBoards(res.data.user.id))
      }
      setLoading(false);
    }
    loadUser();
  }, [dispatch]);

  const currentUser = useSelector(state => state.auth.user);

  // useEffect(() => {

  // }, [dispatch, userID])
  if (loading) {
    return <p>loading...</p>
  }
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        {currentUser.id ? <Navbar /> : <LoginNavbar />}
        <Switch>
          <ProtectedRoute exact path='/users/:userid/boards' component={Boards} currentUserId={currentUser.id} />
          <AuthRoute exact path='/signup' component={SignupPage} currentUserId={currentUser.id} />
          <AuthRoute exact path='/login' component={LoginPage} currentUserId={currentUser.id} />
          <ProtectedRoute exact path='/users/:userid/boards/:boardid' component={BoardPage} currentUserId={currentUser.id} />
          <ProtectedRoute exact path='/users/:userid/boards' component={Boards} currentUserId={currentUser.id} />
          <AuthRoute exact path='/' component={Home} currentUserId={currentUser.id} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
