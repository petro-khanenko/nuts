import React from "react";

const IndicatorItem = ({className, value, onGoToStep}) => {
    const isActive = className === 'indicator__item_active';
    return (
        <div
            className={className}
            onClick={() => isActive ? onGoToStep() : undefined}
        >
            {value}
        </div>
    );
}

export default IndicatorItem;