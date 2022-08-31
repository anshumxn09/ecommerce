import React, {createContext, useState, useEffect} from "react";
import ProductAPI from "./api/ProductAPI";
import axios from 'axios';
import UserAPI from "./api/UserApi";
import CategoryAPI from "./api/CategoryAPI";

export const GlobalState = createContext();

export const DataProvider = ({children}) => {

    const [token , setToken] = useState(false);

    const refreshToken = async () => {
        const getToken = await axios.get('/users/refresh_token');

        console.log(getToken)
        setToken(getToken.data.accesstoken);
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) refreshToken()
    }, [])

    ProductAPI()
    const state = {
        token : [token, setToken],
        productAPI : ProductAPI(),
        UserAPI: UserAPI(token),
        CategoryAPI : CategoryAPI()
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}