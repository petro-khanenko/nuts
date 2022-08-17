import {createContext, useContext, useState} from 'react';

const AdminBasketContext = createContext();

export const AdminBasketContextProvider = ({children}) => {

    const [order, setOrder] = useState({});

    const orderHandler = (order) => {
        setOrder(order);
    };

    return (
        <AdminBasketContext.Provider value={{order, orderHandler}}>
            {children}
        </AdminBasketContext.Provider>
    );
};

export const useAdminBasketData = _ => useContext(AdminBasketContext);
