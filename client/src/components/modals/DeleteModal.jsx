import React from 'react';
import {IconButton, makeStyles} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {useHttp} from "../../hooks/http.hook";
import {apiRoutes, apiSubRoutes} from "../../constants/constants";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 30,
            marginTop: '-13px',
            float: 'right',
        },
        icon: {
            fontSize:30,
            color: 'red',
        },
    })
)

const DeleteModal = ({onCancel, item, fetchItems}) => {

    const { request } = useHttp();
    const {icon, iconButton} = useStyles();

    const deleteCompanyHandler = async () => {
        try {
            const data = await request(`/${apiRoutes.ITEMS}/${apiSubRoutes.DELETE}`, 'DELETE', { id: item._id})
            onCancel()
            if (data.status === 'success') {
                fetchItems()
            }
        } catch (e) {
        }
    }

    return (
        <div className={'modal__overlay'}>
            <div className={'modal__window deletemodal__window'}>
                <div className={'modal__header'}>
                    <div className={'modal__title'}>
                        Delete Company
                        <IconButton className={iconButton}
                                    onClick={onCancel}>
                            <Close className={icon}/>
                        </IconButton>
                    </div>
                </div>
                <div className={'modal__footer'}>
                    <button onClick={deleteCompanyHandler}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal
