import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {
    Button, TextareaAutosize
} from "@material-ui/core";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import styled from '@emotion/styled';
import {useOrderData} from "../../../context/OrderContext";
import {deliveryOptions, orderSteps} from "../../../constants/constants";
import NP from "./NP";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    padding: 10px;
    font-size: 1rem;
    width: 48%;
  }
`;

const StyledFormLabel = styled(FormLabel)`
  & h3 {
    color: black;
  }
`;
const StyledFormControlLabel = styled(FormControlLabel)`
    & .MuiButtonBase-root {
      padding: 9px;
    }
`;
const StyledTextareaAutosize = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px;
`;

const DeliveryInfo = () => {
    const {orderData, onSetOrderData, onSetStep} = useOrderData();
    const [value, setValue] = useState(orderData.address?.method || deliveryOptions.SELF.value);
    const [cityValue, setCityValue] = useState(orderData.address?.npCity || '');
    const [warehouseValue, setWarehouseValue] = useState(orderData.address?.npWarehouse || '');

    const {register, handleSubmit} = useForm({
        defaultValues: {
            comment: orderData.address?.comment
        },
        mode: 'onBlur',
    });

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (data) => {
        const deliveryData = {
            address: {
                ...data,
                method: value,
                npCity: cityValue ? `${cityValue}` : null,
                npWarehouse: warehouseValue ? `${warehouseValue}` : null
            }
        }
        onSetOrderData(deliveryData);
        onSetStep(orderSteps.CONFIRMATION);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
            <FormControl>
                <StyledFormLabel id="radio-btn-group"><h3>Спосіб доставки</h3></StyledFormLabel>
                <RadioGroup
                    aria-labelledby="radio-btn-group"
                    name="delivery"
                    value={value}
                    onChange={handleChange}
                >
                    {
                        Object.values(deliveryOptions).map((el) => (
                            <StyledFormControlLabel
                                value={el.value}
                                label={el.label}
                                control={<Radio/>}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>
            {
                value === deliveryOptions.NP.value && (
                    <NP
                        cityValue={cityValue}
                        warehouseValue={warehouseValue}
                        onSetCityValue={setCityValue}
                        onSetWarehouseValue={setWarehouseValue}
                    />
                )
            }
            <h3>Коментарі</h3>
            <StyledTextareaAutosize
                id="comment"
                {...register('comment')}
                minRows={6}
                placeholder="Коментарі та побажання"
            />
            <ButtonsContainer>
                <StyledButton
                    variant='contained'
                    color='secondary'
                    onClick={() => onSetStep(orderSteps.PERSONAL_INFO)}
                >
                    Назад
                </StyledButton>
                <StyledButton
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={value === deliveryOptions.NP.value && (!cityValue || !warehouseValue) }
                >
                    Далі
                </StyledButton>
            </ButtonsContainer>
        </form>
    );
}

export default DeliveryInfo;