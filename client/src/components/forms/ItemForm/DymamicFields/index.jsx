import React, {useState} from 'react'
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import {DynamicField} from "./DynamicField";

// styled components
const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    padding: 10px;
    font-size: 1rem;
    width: 50%;
  }
`;

let counter = 0;

export const DynamicFields = ({
                                  dynamicKeysForm,
                                  dynamicValuesForm,
                                  dynamicKeysFormHandler,
                                  dynamicValuesFormHandler,
                                  initFieldsCount = []
                              }) => {

    const [addFieldsCount, setAddFieldsCount] = useState(initFieldsCount)

    return (
        <>
            {addFieldsCount.map((el, idx) => <DynamicField
                dynamicKey={dynamicKeysForm[`itemKey${idx}`]}
                dynamicValue={dynamicValuesForm[`itemValue${idx}`]}
                dynamicKeysFormHandler={dynamicKeysFormHandler}
                dynamicValuesFormHandler={dynamicValuesFormHandler}
                idx={idx}
                key={el}
            />)}
            <div className="dynamic-field">
                <StyledButton
                              variant='contained'
                              color='primary'
                              onClick={() => setAddFieldsCount(prev => [...prev, counter += 1])}
                >
                    Додати поле
                </StyledButton>
                <StyledButton
                    variant='contained'
                    color='secondary'
                    onClick={() => setAddFieldsCount(prev => prev.slice(0, prev.length - 1))}
                >
                    Видалити поле
                </StyledButton>
            </div>
        </>
    );
}
