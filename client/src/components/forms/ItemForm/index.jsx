import React from 'react';
import {FormFields} from "./ItemFormFields";
import {DynamicFields} from "./DymamicFields";
import {styled} from "@mui/material";
import {Button} from "@material-ui/core";

// styled components
const StyledButton = styled(Button)`
  margin-top: 20px;
  padding: 10px;
  font-size: 1rem;
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