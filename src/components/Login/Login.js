import { Fragment, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, closeLogin, logout } from "../../auth/auth";

const portalElement = document.getElementById('overlays');

const Login = () => {
    const [register, setRegister] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordValidity, setPasswordValidity] = useState(false);

    const dispatch = useDispatch();
    const userLoggedIn = useSelector(state => state.user.userIsLoggedIn);


    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const changeAuthMode = () => {
        setRegister(register => !register);
    };


    const passwordHandler = (e) => {
        setPassword1(e.target.value);
    }

    const confirmPasswordHandler = (e) => {
        setPassword2(e.target.value);
        if (password1 === e.target.value) {
            setPasswordValidity(true);
        }
        else {
            setPasswordValidity(false);
        }
    }

    const closeLoginHandler = () => {
        dispatch(closeLogin());
    }

    const logoutHandler = () => {
        dispatch(logout());
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        dispatch(authenticateUser(enteredEmail, enteredPassword, register));
    }


    return <Fragment>
        {ReactDOM.createPortal(
            <div className={`absolute top-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 z-20 rounded-lg overflow-hidden shadow-lg min-w-[90%] md:min-w-[60%] lg:min-w-[30%]`}>
                <div className="flex flex-col">
                    <div className="bg-gray-200">
                        <h1 className="text-[2rem] font-bold text-slate-700 py-3 px-3 text-center">Account</h1>
                    </div>
                    {!userLoggedIn &&
                        <div className="p-5">
                            <div className="flex flex-col md:flex-row justify-between mb-12 cursor-pointer" onClick={changeAuthMode}>
                                <div className={`text-center basis-1/2 px-2 py-3 ${register ? 'bg-gray-200 text-gray-600 shadow-inner' : ' bg-gray-600 text-white shadow-md'} transition-all`}>
                                    I already have an account
                                </div>
                                <div className={`text-center basis-1/2 px-2 py-3  ${register ? 'bg-gray-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 shadow-inner'} transition-all`}>
                                    Create New Account
                                </div>
                            </div>

                            <form onSubmit={submitHandler}>
                                <div>
                                    <label htmlFor='email' className="text-slate-700 font-medium text-md block mb-2">Email</label>
                                    <input
                                        type='email'
                                        id='email'
                                        className="border border-slate-400 rounded w-full h-10 p-2 mb-6 outline-1 outline-slate-500"
                                        required
                                        ref={emailInputRef} />
                                </div>
                                <div>
                                    <label htmlFor='password' className="text-slate-700 font-medium text-md block mb-2">
                                        Password {register ? <span className="text-slate-500 text-sm">( minimum 6 characters )</span> : ''}
                                    </label>
                                    <input
                                        type='password'
                                        id='password'
                                        required
                                        className="border border-slate-400 rounded w-full h-10 p-2 mb-6 outline-1 outline-slate-500"
                                        ref={passwordInputRef}
                                        onBlur={passwordHandler}
                                    />
                                </div>
                                {register && <div>
                                    <label htmlFor='confirm_password' className="text-slate-700 font-medium text-md block mb-2">
                                        Confirm Password
                                        {password2.length > 0 ?
                                            <span className={`font-sm pl-1 ${passwordValidity ? 'text-green-500' : 'text-red-500'}`}>
                                                ( Passwords {!passwordValidity ? 'Do Not Match' : 'Match'})
                                            </span> :
                                            ''
                                        }
                                    </label>
                                    <input
                                        type='password'
                                        id='confirm_password'
                                        required
                                        className="border border-slate-400 rounded w-full h-10 p-2 mb-6 outline-1 outline-slate-500"
                                        onChange={confirmPasswordHandler}
                                    />
                                </div>}
                                <button
                                    type='submit'
                                    className="capitalize text-center w-full bg-orange-500 text-white py-3 font-medium rounded shadow-md mb-5 transition hover:bg-slate-600 hover:shadow-lg"
                                >
                                    {register ? 'Create new account' : 'Login with existing account'}
                                </button>

                            </form>
                        </div>
                    }
                </div>
                {userLoggedIn &&
                    <Fragment>
                        <p className="text-center px-3 pt-5">You are logged in now, are you trying to logout?</p>
                        <div className="p-5 flex">
                            <button
                                type="button"
                                className="capitalize text-center w-full bg-gray-200 text-orange-500 py-3 font-medium rounded mx-1 mb-5"
                                onClick={closeLoginHandler}>No</button>
                            <button
                                className="capitalize text-center w-full bg-orange-500 text-white py-3 font-medium rounded shadow-md mx-1 mb-5"
                                type="button"
                                onClick={logoutHandler}>Yes</button>
                        </div>
                    </Fragment>
                }
            </div>
            , portalElement)}
        {ReactDOM.createPortal(
            <div className="fixed bg-slate-900 opacity-75 h-full w-full top-0 left-0 right-0 bottom-0 z-10" onClick={closeLoginHandler}></div>
            , portalElement)}
    </Fragment>
}

export default Login;
