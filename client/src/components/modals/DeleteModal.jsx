import React from 'react'
import {useHttp} from "../../hooks/http.hook"
import {IconButton, makeStyles} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

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

const DeleteModal = ({onCancel, company, fetchCompanies}) => {

    const { request } = useHttp();
    const {icon, iconButton} = useStyles();

    const deleteCompanyHandler = async () => {
        try {
            const data = await request('/api/companies/delete', 'DELETE', { id: company._id})
            onCancel()
            if (data.status === 'success') {
                fetchCompanies()
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
