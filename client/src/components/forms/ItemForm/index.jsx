import React from 'react';
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import {FormFields} from "./ItemFormFields";
import {DynamicFields} from "./DymamicFields";

// styled components
const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    margin-top: 20px;
    padding: 10px;
    font-size: 1rem;
  }
`;

const ItemForm = ({
                      form,
                      formHandler,
                      fileSelectorHandler,
                      initFieldsCount,
                      dynamicKeysForm,
                      dynamicValuesForm,
                      dynamicKeysFormHandler,
                      dynamicValuesFormHandler,
                      onSaveItem
                  }) => {
    return (
        <>
            <FormFields
                form={form}
                formHandler={formHandler}
                fileSelectorHandler={fileSelectorHandler}
            />
            <DynamicFields
                initFieldsCount={initFieldsCount}
                dynamicKeysForm={dynamicKeysForm}
                dynamicValuesForm={dynamicValuesForm}
                dynamicKeysFormHandler={dynamicKeysFormHandler}
                dynamicValuesFormHandler={dynamicValuesFormHandler}

            />
            <StyledButton
                fullWidth
                variant='contained'
                color='primary'
                onClick={onSaveItem}
            >
                Зберегти
            </StyledButton>
        </>
    )
}

export default ItemForm;