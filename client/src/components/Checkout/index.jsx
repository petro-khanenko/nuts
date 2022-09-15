import React from 'react';
import PersonalInfo from "./PersonalInfo";
import {useOrderData} from "../../context/OrderContext";
import {orderSteps} from "../../constants/constants";
import DeliveryInfo from "./DeliveryInfo";
import Indicator from "./Indicator";


const renderStep = (step) => {
    switch (step) {
        case orderSteps.PERSONAL_INFO:
            return <PersonalInfo/>;
        case orderSteps.DELIVERY_INFO:
            return <DeliveryInfo/>;
    }
}

const Checkout = () => {
    const {step} = useOrderData();
    return (
        <>
            <Indicator/>
            {
                renderStep(step)
            }
        </>
    );
}

export default Checkout;