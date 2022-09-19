import React, {useState} from 'react';
import styled from '@emotion/styled'
import {useOrderData} from "../../context/OrderContext";
import {deliveryOptions, orderSteps} from "../../constants/constants";
import {
    Button
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import NP from "./NP";

const schema = yup.object().shape({
    firstName: yup.string().matches(/^([^\d]*)$/, 'Це поле може містити лише літери!').required(`Поле обов'язкове!`),
    lastName: yup.string().matches(/^([^\d]*)$/, 'Це поле може містити лише літери!').required(`Поле обов'язкове!`),
    email: yup.string().email('Невірний формат!').required(`Поле обов'язкове!`),

});

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const StyledButton = styled(Button)`
  padding: 10px;
  font-size: 1rem;
  width: 48%;
`;

const DeliveryInfo = () => {
    const {orderData, onSetOrderData, onSetStep} = useOrderData();
    const [value, setValue] = useState(orderData.delivery || 'self');

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            delivery: orderData.delivery
        },
        mode: 'onBlur',
        // resolver: yupResolver(schema),
    });

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (data) => {
        onSetOrderData(data);
        onSetStep(orderSteps.CONFIRMATION);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
            <FormControl>
                <FormLabel id="radio-btn-group">Спосіб доставки</FormLabel>
                <RadioGroup
                    aria-labelledby="radio-btn-group"
                    name="delivery"
                    value={value}
                    onChange={handleChange}
                >
                    {
                        Object.values(deliveryOptions).map((el) => (
                            <FormControlLabel
                                value={el.value}
                                label={el.label}
                                control={<Radio/>}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>
            <NP/>
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
                >
                    Далі
                </StyledButton>
            </ButtonsContainer>
        </form>
    );
}

export default DeliveryInfo;