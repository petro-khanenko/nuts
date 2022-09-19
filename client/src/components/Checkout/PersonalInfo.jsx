import React from 'react';
import {useOrderData} from "../../context/OrderContext";
import {orderSteps} from "../../constants/constants";
import {
    Button,
    TextField
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";


const schema = yup.object().shape({
    firstName: yup.string().matches(/^([^\d]*)$/, 'Це поле може містити лише літери!').required(`Поле обов'язкове!`),
    lastName: yup.string().matches(/^([^\d]*)$/, 'Це поле може містити лише літери!').required(`Поле обов'язкове!`),
    email: yup.string().email('Невірний формат!').required(`Поле обов'язкове!`),

});

const StyledButton = styled(Button)`
  margin-top: 40px;
  padding: 10px;
  font-size: 1rem;
`;


const PersonalInfo = ({order}) => {
    const {orderData, onSetOrderData, onSetStep} = useOrderData();
    const defaultValues = order ? order : orderData;

    // const defaultValues = defaultOrder ? {
    //     firstName: defaultOrder.firstName,
    //     lastName: defaultOrder.lastName,
    //     email: defaultOrder.email,
    //     phone: defaultOrder.phone,
    //     address: defaultOrder.address
    // } : {};

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        onSetOrderData(data);
        onSetStep(orderSteps.DELIVERY_INFO);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField variant={'outlined'}
                       margin={'normal'}
                       fullWidth
                       label={`Ім'я`}
                       id={'firstName'}
                       {...register('firstName')}
                       error={!!errors.firstName}
                       helperText={errors?.firstName?.message}
            />
            <TextField variant={'outlined'}
                       margin={'normal'}
                       fullWidth
                       label={'Прізвище'}
                       id={'lastName'}
                       {...register('lastName')}
                       error={!!errors.firstName}
                       helperText={errors?.lastName?.message}
            />
            <TextField variant={'outlined'}
                       margin={'normal'}
                       fullWidth
                       type={'email'}
                       required
                       id={'email'}
                       label={'Email'}
                       {...register('email')}
                       error={!!errors.email}
                       helperText={errors?.email?.message}
            />
            <TextField variant={'outlined'}
                       margin={'normal'}
                       fullWidth
                       type={'tel'}
                       required
                       id={'phone'}
                       label={'Номер телефону'}
                       {...register('phone')}
            />
            <StyledButton fullWidth
                          type='submit'
                          variant='contained'
                          color='primary'
            >
                Далі
            </StyledButton>
        </form>
    );
}

export default PersonalInfo;