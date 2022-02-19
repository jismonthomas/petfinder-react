import { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Search from './Pages/Search';
import PetDetails from './Pages/PetDetails';
import Favourites from './Pages/Favourites';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/UI/Notification';
import Login from './components/Login/Login';
import { checkLogin } from './auth/auth';

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const showLogin = useSelector(state => state.ui.showLogin);
  const userFavourites = useSelector(state => state.user.userFavourites);

  useEffect(() => {
    if (userFavourites?.length) {
      localStorage.setItem('favouritePets', JSON.stringify(userFavourites));
    }
  }, [userFavourites]);


  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  return (
    <Fragment>
      {showLogin && <Login />}
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}></Notification>}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search/:pet/:location' element={<Search />}></Route>
        <Route path='/:pet/:petId' element={<PetDetails />} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </Fragment>
  );
}

export default App;
