import { XIcon } from "@heroicons/react/solid";
import { Fragment, useCallback, useEffect } from "react"
import ReactDOM from 'react-dom';
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const portalElement = document.getElementById('notifications');

function Notification({ status, title, message }) {

    const dispatch = useDispatch();


    const closeNotification = useCallback(() => {
        dispatch(uiActions.showNotification('reset'))
    }, []);

    useEffect(() => {
        const notificationTimer = setTimeout(closeNotification, 10000);

        return () => {
            if (notificationTimer) {
                clearTimeout(notificationTimer);
            }
        }
    }, [closeNotification]);

    let notificationTheme = 'slate';

    if (status === 'pending') {
        notificationTheme = 'bg-amber-500';
    }
    if (status === 'success') {
        notificationTheme = 'bg-green-500';
    }
    if (status === 'error') {
        notificationTheme = 'bg-red-500';
    }

    return <Fragment>
        {ReactDOM.createPortal(
            <div className={`absolute left-1/2 -translate-x-1/2 top-2 rounded-lg overflow-hidden shadow-xl bg-white z-30 min-w-[90%] sm:min-w-[50%]`}>
                <div className="flex">
                    {title &&
                        <div className={`flex items-center py-1 px-5 grow text-white font-semibold ${notificationTheme}`}>
                            <h1>{title}</h1>
                        </div>
                    }
                    <button className="flex justify-items-center items-center p-3 bg-slate-700 hover:bg-black" onClick={closeNotification}>
                        <XIcon className="fill-white h-6" />
                    </button>
                </div>
                {title &&
                    <div className="py-5 px-5">{message}</div>
                }
            </div>
            , portalElement)}
    </Fragment>
}

export default Notification