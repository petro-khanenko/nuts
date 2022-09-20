import React from 'react';
import styled from "@emotion/styled";
import {TextField} from "@material-ui/core";

// styled components
const DynamicTextField = styled(TextField)`
  width: 50%;
`;

export const DynamicField = ({idx, dynamicKey, dynamicKeysFormHandler, dynamicValue, dynamicValuesFormHandler }) => {

    return (
        <div className="dynamic-field">
            <DynamicTextField variant='outlined'
                              margin='normal'
                              label='Характеристика товару'
                              id={`itemKey${idx}`}
                              name={`itemKey${idx}`}
                              value={dynamicKey}
                              onChange={dynamicKeysFormHandler}
            />
            <DynamicTextField variant='outlined'
                              margin='normal'
                              label='Значення'
                              id={`itemValue${idx}`}
                              name={`itemValue${idx}`}
                              value={dynamicValue}
                              onChange={dynamicValuesFormHandler}
            />
        </div>
    );
}
