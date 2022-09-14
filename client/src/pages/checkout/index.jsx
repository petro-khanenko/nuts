import React from 'react';
import {Button, Container, makeStyles} from "@material-ui/core";
import PersonalInfo from "./PersonalInfo";
import {useOrderData} from "../../context/OrderContext";
import {mainRoutes, orderSteps} from "../../constants/constants";
import DeliveryInfo from "./DeliveryInfo";
import Indicator from "./Indicator";
import {NavLink} from "react-router-dom";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 140px)',
        marginTop: '80px',
        marginBottom: '60px',
        backgroundColor: '#e1f1f1'
    }
}));

const renderStep = (step) => {
    switch (step) {
        case orderSteps.PERSONAL_INFO:
            return <PersonalInfo/>;
        case orderSteps.DELIVERY_INFO:
            return <DeliveryInfo/>;
    }
}

const Checkout = () => {
    const {root} = useStyles();
    const {step} = useOrderData();
    return (
        <>
             {/*<div className='checkout__go-back-button'>*/}
             {/*   <NavLink to={`/${mainRoutes.BASKET}`}>*/}
             {/*       <Button startIcon={<ArrowBackIos/>}*/}
            {/*                variant='contained'*/}
            {/*                size='large'*/}
            {/*                color='secondary'*/}
            {/*        >*/}
            {/*           Повернутися до корзини*/}
            {/*        </Button>*/}
            {/*   </NavLink>*/}
            {/*</div>*/}
            {/*<Container className={root} container={'main'} maxWidth={'sm'}>*/}
                <Indicator/>
                {
                    renderStep(step)
                }
             {/*</Container>*/}
        </>
    );
}

export default Checkout;