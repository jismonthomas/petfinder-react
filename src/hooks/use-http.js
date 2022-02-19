import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    let userToken = '';
    let userTokenExpiry = useSelector(state => state.user.userTokenExpiry);

    useEffect(() => {
        const localUserItems = localStorage.getItem("petfinder");

        if (localUserItems) {
            const parsedLocalUserItems = JSON.parse(localUserItems);

            userToken = parsedLocalUserItems.token;
            userTokenExpiry = parsedLocalUserItems.tokenExpiry;
        }
    }, []);

    const getToken = async () => {
        try {
            const response = await fetch('https://api.petfinder.com/v2/oauth2/token/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grant_type: 'client_credentials',
                    client_id: process.env.REACT_APP_PETFINDER_API,
                    client_secret: process.env.REACT_APP_PETFINDER_SECRET
                })
            });
            if (!response.ok) {
                throw new Error('Could not fetch token from petfinder.');
            }

            const data = await response.json();
            const tokenExpiry = new Date().getTime() + data.expires_in * 1000;

            localStorage.setItem('petfinder',
                JSON.stringify({
                    token: data.access_token,
                    tokenExpiry: tokenExpiry
                })
            );
            return data.access_token;
        }
        catch (error) {
            setError(error.message)
        }

    }

    const fetchData = useCallback(async (url) => {
        setIsLoading(true);
        setError(null);

        if (!userToken) {
            userToken = await getToken();
        }
        else {
            const currentTime = new Date().getTime();
            if (currentTime > userTokenExpiry) {
                userToken = await getToken();
            }
        }

        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                }
            }
            );
            const data = await response.json();

            if (!response.ok) {
                let errorTitle = data.title;
                if (data.status == 400 && data['invalid-params'][0].message) {
                    errorTitle = data['invalid-params'][0].message;
                }
                throw new Error('Error fetching data from PETFINDER! ' + errorTitle);
            }

            setResult(data);
        }
        catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);


    return {
        isLoading,
        error,
        fetchData,
        result
    };
};

export default useHttp;