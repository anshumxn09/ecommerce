import React, {createContext, useState} from "react";
import ProductAPI from "./api/ProductAPI";
export const GlobalState = createContext();

export const DataProvider = ({children}) => {

    const [token , setToken] = useState(false);






    ProductAPI()
    const state = {
        token : [token, setToken],
        productAPI : ProductAPI(),
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}