import React, {useState} from 'react';
import styled from '@emotion/styled'
import {useOrderData} from "../../context/OrderContext";
import {deliveryOptions, orderSteps} from "../../constants/constants";
import {
    Button, TextareaAutosize
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import NP from "./NP";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
  line-height: 1.875rem;

  & span {
    font-weight: 700;
  }
`;

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

const Confirmation = ({onSubmit, onCancel}) => {
    const {orderData, clearOrderData, onSetStep} = useOrderData();

    const handleSubmit = () => {
        onSubmit(orderData);
        onCancel();
        onSetStep(orderSteps.PERSONAL_INFO);
        clearOrderData({});
    };

    return (
        <div style={{width: '100%'}}>
            <h2>Інформація для доставки</h2>
            <InfoContainer>
                <div><span>Ім'я: </span>
                    {orderData.firstName}
                </div>
                <div><span>Прізвище: </span>
                    {orderData.lastName}
                </div>
                <div><span>Email: </span>
                    {orderData.email}
                </div>
                <div><span>Телефон: </span>
                    {orderData.phone}
                </div>
                <div><span>Спосіб доставки: </span>
                    {deliveryOptions[orderData.address.method].label}
                </div>
                {
                    orderData.address.method === deliveryOptions.NP.value && (
                        <div><span>Адреса доставки: </span>
                            {`${orderData.address.npWarehouse}, ${orderData.address.npCity}`}
                        </div>
                    )
                }
                <div><span>Коментарі: </span>
                    {orderData.address.comment}
                </div>
            </InfoContainer>
            <ButtonsContainer>
                <StyledButton
                    variant='contained'
                    color='secondary'
                    onClick={() => onSetStep(orderSteps.DELIVERY_INFO)}
                >
                    Назад
                </StyledButton>
                <StyledButton
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                >
                    Оформити
                </StyledButton>
            </ButtonsContainer>
        </div>
    );
}

export default Confirmation;