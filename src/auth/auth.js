import { getUserFavourites } from "../lib/api";
import { uiActions } from "../store/ui-slice";
import { userActions } from "../store/user-slice";

const currentTime = new Date().getTime();
let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
}

export const closeLogin = () => {
    //close login pop up
    return (dispatch) => {
        dispatch(uiActions.toggleLogin());
    }
}

export const logout = () => {
    //remove local storage, reset all store values and clear the timer
    localStorage.removeItem('petfinderUser');
    localStorage.removeItem('favouritePets');
    return (dispatch) => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        dispatch(userActions.logout());
    }
};

export const checkLogin = () => {
    //check the validity of user login from local storage
    return (dispatch) => {
        const localUserDetails = JSON.parse(localStorage.getItem("petfinderUser"));
        const localFavouritePets = JSON.parse(localStorage.getItem('favouritePets'));

        const remainingTime = calculateRemainingTime(localUserDetails?.tokenExpiry);

        if (localUserDetails && remainingTime > 2000) {
            dispatch(userActions.setLoginToken({
                tokenExpiry: localUserDetails.loginTokenExpiry,
                userId: localUserDetails.id
            }));

            if (localFavouritePets?.length) {
                dispatch(userActions.setUserFavourites(localFavouritePets));
            }

            logoutTimer = setTimeout(() => {
                dispatch(logout());
            }, remainingTime);
        }
        else {
            // local storage info is already expired and logout the user
            dispatch(logout());
        }
    }
}

export const authenticateUser = (enteredEmail, enteredPassword, register) => {
    return async (dispatch) => {
        let url;
        if (register) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABbq2O-WkgkBDh-LiIJKNNJGWWUu1C-wU'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABbq2O-WkgkBDh-LiIJKNNJGWWUu1C-wU'
        }

        try {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Authenticating User',
                message: 'Please wait...'
            }));
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (!response.ok) {
                if (register) {
                    throw new Error('There was an error creating your account. Please try again!');
                }
                else {
                    throw new Error('There was an error trying login to your account. Please try again!');
                }
            }

            const data = await response.json();

            const loginTokenExpiry = new Date().getTime() + data.expiresIn * 1000;
            const userId = data.localId;
            const token = data.idToken;

            console.log('Login Token Expiry at: ', new Date(loginTokenExpiry).toLocaleTimeString("en-US"));

            const savedUserFavourites = await getUserFavourites(userId);

            dispatch(userActions.setLoginToken({
                tokenExpiry: loginTokenExpiry,
                userId: userId
            }));

            dispatch(userActions.setUserFavourites(savedUserFavourites));

            localStorage.setItem('petfinderUser',
                JSON.stringify({
                    token: token,
                    tokenExpiry: loginTokenExpiry,
                    id: userId
                })
            );
            localStorage.setItem('favouritePets', JSON.stringify(savedUserFavourites));

            const remainingTime = calculateRemainingTime(loginTokenExpiry);

            logoutTimer = setTimeout(() => {
                dispatch(logout());
            }, remainingTime);

            dispatch(uiActions.showNotification('reset'));
            dispatch(closeLogin());
        }
        catch (e) {
            console.log('Authentication Error', e.message);
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: e.message
            }));
        }
    }
};