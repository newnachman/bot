import { useCallback, useEffect, useState } from 'react';
import axios from "axios";

export const useFetch = () => {

    // States for controlling fetch details:
    const [url, setUrl] = useState(null);
    const [method, setMethod] = useState(null);
    const [data, setData] = useState(null);
    const [localDetail, setLocalDetail] = useState(null);

    // Response data:
    const [fetchedResponse, setFetchedResponse] = useState();

    // Function for triggering useEffect by changing state (activating the fetch):
    const fetchData = useCallback(
        (fetchDetail, fetchedUrl, fetchedMethod = "GET", fetchedData = null) => {
            setLocalDetail?.(fetchDetail);
            setUrl(fetchedUrl);
            setMethod(fetchedMethod);
            setData(fetchedData);
        }, [],
    )

    useEffect(() => {
        if (!url) { return; }
        setFetchedResponse(state => ({data: state?.data, loading: true, error: null}));

        axios.request({
            method: method,
            url: url,
            data: data
        }).then((result) => {
            setFetchedResponse({data: result.data, loading: false, error: null});
        }).catch(error => {
            setFetchedResponse({data: localDetail, loading: false, error: error});
        });
    }, [url, method, data, localDetail])
    
    return { fetchedResponse, fetchData }
}