import React from "react";
import styled from "@emotion/styled";

const IndicatorBlock = styled.div`
  border-bottom-right-radius: ${({isLast}) => isLast ? '17px' : 0};
  border-top-right-radius: ${({isLast}) => isLast ? '17px' : 0};
`;

const IndicatorItem = ({isLast, className, value, onGoToStep}) => {
    const isActive = className === 'indicator__item_active';
    return (
        <IndicatorBlock
            isLast={isLast}
            isActive={isActive}
            className={className}
            onClick={() => isActive ? onGoToStep() : undefined}
        >
            {value}
        </IndicatorBlock>
    );
}

export default IndicatorItem;