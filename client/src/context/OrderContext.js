import React, {createContext, useContext, useState} from "react";
import {getFromStorage} from "../helpers/helpers";
import {localStorageKeys, orderSteps} from "../constants/constants";

const OrderContext = createContext();

export const OrderDataProvider = ({children}) => {
    const [orderData, setOrderData] = useState({});
    const [step, setStep] = useState(getFromStorage(localStorageKeys.ORDER_STEP) || orderSteps.PERSONAL_INFO);

    const handleOrderData = (values) => {
        setOrderData(prev => ({
            ...prev,
            ...values
            }));
    }

    const clearOrderData = () => {
        setOrderData({});
    }

    return (
        <OrderContext.Provider value={{
            orderData,
            onSetOrderData: handleOrderData,
            step,
            onSetStep: setStep,
            clearOrderData
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrderData = _ => useContext(OrderContext);

