import { useState } from "react";
import apiClient from "../config/axios";

const useMutation = ({ url, method = 'POST' }: { url: string, method: string }) => {
    const [state, setState] = useState({
        loading: false,
        error: null,
    });


    const fn = async (data: any) => {
        setState((prev) => ({ 
            ...prev, 
            loading: true,
        }));

        apiClient({
            url,
            method,
            data,
        }).then(() => {
            setState((prev) => ({ ...prev, loading: false, error: null}));
        }).catch((err) => {
            setState((prev) => ({ ...prev, loading: false, error: err }));
        }).finally(() => {
            setState((prev) => ({ ...prev, loading: false }));
        });
    }

    return {...state, mutate: fn};
}

export default useMutation;