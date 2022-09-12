import React from 'react'
import {adminViews} from "../../../constants/constants";
import {Button} from "@material-ui/core";

export const AdminViewsSwitcher = ({switchMode, onSwitchView}) => {

    return (
        <div>
            {
                Object.values(adminViews).map(view => (
                    // <Button
                    //     variant='contained'
                    //     color='primary'
                    //     disabled={switchMode === view}
                    //     onClick={() => onSwitchView(view)}
                    // >
                    //     {view}
                    // </Button>
                    <button onClick={() => onSwitchView(view)}
                            disabled={switchMode === view}
                    >
                        {view}
                    </button>
                ))
            }
        </div>
    );
}
