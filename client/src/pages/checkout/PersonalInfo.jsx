import React from 'react';
import {useOrderData} from "../../context/OrderContext";
import {orderSteps} from "../../constants/constants";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
    firstName: yup.string().matches(/^([^\d]*)$/, 'Це поле може містити лише літери!').required(`Поле обов'язкове!`),
    lastName: yup.string().matches(/^([^\d]*)$/, 'Це поле може містити лише літери!').required(`Поле обов'язкове!`),
    email: yup.string().email('Невірний формат!').required(`Поле обов'язкове!`),

});

const useStyles = makeStyles(theme => ({
    submitButton: {
        marginTop: '40px',
        padding: '10px',
        fontSize: '1.25rem'
    }
}));


const PersonalInfo = () => {
    const {orderData, onSetOrderData, onSetStep} = useOrderData();
    const {submitButton} = useStyles();

    const defaultValues = orderData ? {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address
    } : {};

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
                       style={{padding: 0}}
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
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
            <Button fullWidth
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={submitButton}
            >
                Продовжити
            </Button>
        </form>
    );
}

export default PersonalInfo;