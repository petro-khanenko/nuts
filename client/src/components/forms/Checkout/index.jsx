import React from 'react';
import {useOrderData} from "../../../context/OrderContext";
import {orderSteps} from "../../../constants/constants";
import PersonalInfo from "./PersonalInfo";
import DeliveryInfo from "./DeliveryInfo";
import Indicator from "./Indicator";
import Confirmation from "./Confirmation";


const renderStep = (step, order, onSubmit, onCancel) => {
    switch (step) {
        case orderSteps.PERSONAL_INFO:
            return <PersonalInfo order={order}/>;
        case orderSteps.DELIVERY_INFO:
            return <DeliveryInfo/>;
        case orderSteps.CONFIRMATION:
            return <Confirmation onSubmit={onSubmit} onCancel={onCancel}/>;
    }
}

const Checkout = ({order, onSubmit, onCancel}) => {
    const {step} = useOrderData();
    return (
        <>
            <Indicator/>
            {
                renderStep(step, order, onSubmit, onCancel)
            }
        </>
    );
}

export default Checkout;