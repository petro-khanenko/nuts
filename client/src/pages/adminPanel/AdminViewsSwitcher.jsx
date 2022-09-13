import React from 'react'
import {Button, makeStyles} from "@material-ui/core";
import {adminViews} from "../../constants/constants";

const useStyles = makeStyles((theme) => ({
        viewButton: {
            minWidth: '160px',
            justifySelf: 'center',
            marginRight: '10px',
            border: 'solid 2px rgba(33,30,30,0.7)'
        }
    })
);

export const AdminViewsSwitcher = ({switchMode, onSwitchView}) => {
    const {viewButton} = useStyles();
    return (
        <div>
            {
                Object.values(adminViews).map(view => (
                    <Button
                        variant='contained'
                        color={switchMode === view ? 'secondary' : 'primary'}
                        className={viewButton}
                        onClick={() => onSwitchView(view)}
                    >
                        {view}
                    </Button>
                ))
            }
        </div>
    );
}
