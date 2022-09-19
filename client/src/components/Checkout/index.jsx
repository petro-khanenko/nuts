import React from 'react';
import PersonalInfo from "./PersonalInfo";
import {useOrderData} from "../../context/OrderContext";
import {orderSteps} from "../../constants/constants";
import DeliveryInfo from "./DeliveryInfo";
import Indicator from "./Indicator";


const renderStep = (step, order, onSubmit) => {
    switch (step) {
        case orderSteps.PERSONAL_INFO:
            return <PersonalInfo order={order}/>;
        case orderSteps.DELIVERY_INFO:
            return <DeliveryInfo/>;
    }
}

const Checkout = ({order, onSubmit}) => {
    const {step} = useOrderData();
    return (
        <>
            <Indicator/>
            {
                renderStep(step, order, onSubmit)
            }
        </>
    );
}

export default Checkout;