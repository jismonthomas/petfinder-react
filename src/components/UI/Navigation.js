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
            <nav className='sm:px-10 md:px-16 lg:px-24 py-0 sm:py-5 flex flex-col sm:flex-row items-center justify-between text-slate-50'>
                <h1 className='py-2 sm:py-0 px-10 sm:px-0 w-full sm:w-auto bg-orange-600 sm:bg-inherit drop-shadow-md sm:drop-shadow-none text-2xl text-slate-100 font-extrabold'>
                    <Link to='/'>
                        Petfinder
                    </Link>
                </h1>
                <ul className='px-10 sm:px-0 pb-3 sm:pb-0 pt-4 sm:pt-0 flex font-medium justify-start sm:justify-between min-w-full sm:min-w-[10%] bg-neutral-900/10 sm:bg-inherit'>
                    <li className='pr-4'>
                        <NavLink to='/' className='hover:text-amber-200'>Home</NavLink>
                    </li>
                    <li className='pr-4'>
                        <NavLink to='/favourites' className={({ isActive }) => (isActive ? "text-amber-200" : 'hover:text-amber-200')}>Favourites</NavLink>
                    </li>
                    <li className=' ml-auto'>
                        <button className='font-medium hover:text-amber-200' onClick={toggleLogin}>
                            {userLoggedIn ? 'Logout' : 'Login'}
                        </button>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );

}

export default Navigation;