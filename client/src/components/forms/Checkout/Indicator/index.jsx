import React from "react";
import {orderSteps} from "../../../../constants/constants";
import {useOrderData} from "../../../../context/OrderContext";
import IndicatorItem from "./IndicatorItem";


const Indicator = () => {
    const {step, onSetStep} = useOrderData();
    const getClassName = (idx, arr) => {
        const currentStepIdx = arr.indexOf(step);
        return idx <= currentStepIdx ? 'indicator__item_active' : 'indicator__item_disabled'
    };
    const checkIsLast = (value) => {
        return value === step;
    }

    return (
        <div className='indicator'>
            {
                Object.values(orderSteps).map((value, idx, arr) => (
                    <IndicatorItem
                        isLast={checkIsLast(value)}
                        className={getClassName(idx, arr)}
                        value={value}
                        onGoToStep={() => onSetStep(value)}
                    />
                ))
            }
        </div>
    );
}

export default Indicator;