import React from 'react'
import {Container, IconButton, makeStyles} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 40,
            marginRight: '-15px'
        },
        icon: {
            fontSize: 40,
            color: 'red',
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '4% auto',
            paddingBottom: '35px',
            backgroundColor: '#e1f1f1'
        }
    })
)

export const OrderModal = ({
                                     onCancel,
                                     children
                                 }) => {

    const {root, icon, iconButton} = useStyles();

    return (
        <div className={'modal__overlay'}>
            <Container className={root} container={'main'} maxWidth={'sm'}>
                <div className={'modal__header'}>
                    <div className={'modal__title'}>
                        Оформлення замовлення
                    </div>
                    <IconButton className={iconButton}
                                onClick={onCancel}>
                        <Cancel className={icon}/>
                    </IconButton>
                </div>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            onCancel
                        });
                    }
                    return null;
                })}
            </Container>
        </div>
    );
}

