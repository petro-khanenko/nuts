import React from 'react'
import {Button, TextareaAutosize, TextField} from "@material-ui/core";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {parsePhoneNumberFromString} from "libphonenumber-js";
import {useForm} from "react-hook-form";

const schema = yup.object().shape({
    firstName: yup.string().matches(/^([^\d]*)$/, 'This field includes only letters').required('This field is required'),
    lastName: yup.string().matches(/^([^\d]*)$/, 'This field includes only letters').required('This field is required'),
    email: yup.string().email('Email is invalid').required('This field is required'),

})

export const OrderFormFields = ({onSubmit, order }) => {

    const defaultValues = order ? {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        phone: order.phone,
        address: order.address
    } : {};

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    // const normalizePhoneNumber = value => {
    //     const phoneNumber = parsePhoneNumberFromString(value);
    //     if (!phoneNumber) {
    //         return value;
    //     }
    //     return phoneNumber.formatInternational();
    // }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='orderForm'>
                <TextField variant={'outlined'}
                           margin={'normal'}
                           fullWidth
                           style={{padding: 0}}
                           label={'First Name'}
                           id={'firstName'}
                           {...register('firstName')}
                           error={!!errors.firstName}
                           helperText={errors?.firstName?.message}
                />
                <TextField variant={'outlined'}
                           margin={'normal'}
                           fullWidth
                           label={'Last Name'}
                           id={'lastName'}
                           {...register('lastName')}
                           error={!!errors.firstName}
                           helperText={errors?.firstName?.message}
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
                           label={'Phone Number'}
                           {...register('phone')}
                           // onChange={e => e.target.value = normalizePhoneNumber(e.target.value)}
                />
                <p className="orderForm_address">Адреса доставки та коментарі</p>
                <TextareaAutosize
                    id="address"
                    {...register('address')}
                    minRows={4}
                    style={{width: 352}}
                    placeholder="Адреса доставки та коментарі"
                />
            </div>
            <div className={'modal__footer'}>
                <Button fullWidth
                        type='submit'
                        variant='contained'
                        >
                    Підтвердити замовлення
                </Button>
            </div>
        </form>
    );
}
