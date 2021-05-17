import { useState, useEffect, useCallback, useRef } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // store piece of data, will not change or reinitialized when this function runs again.
    const activeHttpRequests = useRef([]);

    // to avoid infinite loops, wrap it with useCallback, so that this functions is 
    // not recreated when component that uses this hook gets re-rendered. 
    // this function does not have any dependency so we have empty array as 2nd arg to callback
    const sendRequest = useCallback(async ( url, method = 'GET', body = null, headers = {} ) => {
        setIsLoading(true);

        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);

        try{
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            });
            const respData = await response.json();
            
            activeHttpRequests.current = activeHttpRequests.current.filter(rqstCtrlr => rqstCtrlr !== httpAbortController);
            if(!response.ok){
                throw new Error(respData.message);
            }
            setIsLoading(false);
            return respData;

        }catch (err){
            setError(err.message || 'Something went wrong, please try again.')
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(()=> {
        activeHttpRequests.current.forEach(abortCntlr => abortCntlr.abort());
    }, []);

    return { isLoading, error, sendRequest, clearError };
}