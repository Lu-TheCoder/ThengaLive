import { useEffect, useState } from "react";
import apiClient from "../config/axios";

const useQuery = (url: string, refatch: any) => {
    const [state, setState] = useState({
        loading: false,
        error: null,
        data: null,
    });

   useEffect(() => {
     const fetch = async () => {
        apiClient.get(url)
        .then(({data}) => {
            setState({data, loading: false, error: null});
        }).catch(err => {
            setState({data: null, loading: false, error: err.message});
        })
     }
     fetch();
   }, [url, refatch]);

    return state;
}

export default useQuery;
