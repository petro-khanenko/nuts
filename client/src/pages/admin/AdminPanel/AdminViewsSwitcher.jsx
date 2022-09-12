import React from 'react'
import {adminViews} from "../../../constants/constants";

export const AdminViewsSwitcher = ({switchMode, onSwitchView}) => {

    return (
        <div>
            {
                Object.values(adminViews).map(view => (
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
