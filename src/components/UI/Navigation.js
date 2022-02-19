import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { uiActions } from '../../store/ui-slice';

const Navigation = () => {

    const userLoggedIn = useSelector(state => state.user.userIsLoggedIn);
    const dispatch = useDispatch();

    const toggleLogin = () => {
        dispatch(uiActions.toggleLogin());
    }

    return (
        <Fragment>
            <nav className='px-10 md:px-16 lg:px-24 py-5 flex items-center justify-between text-slate-50'>
                <h1 className='text-2xl text-slate-100 font-extrabold'>
                    <Link to='/'>
                        Petfinder
                    </Link>
                </h1>
                <ul className='flex font-medium justify-between min-w-[10%]'>
                    <li className='pr-4'>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li className='pr-4'>
                        <NavLink to='/favourites' className={({ isActive }) => (isActive ? "text-amber-200" : '')}>Favourites</NavLink>
                    </li>
                    <li>
                        <button className='font-medium' onClick={toggleLogin}>
                            {userLoggedIn ? 'Logout' : 'Login'}
                        </button>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );

}

export default Navigation;