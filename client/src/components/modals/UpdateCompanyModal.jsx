import React, {useState} from 'react'
import {useHttp} from "../../hooks/http.hook"
import {swalWithCustom} from "../../utils/swal/swalWithCustom";
import {FormFields} from "../FormFields/FormFields";
import {
    fileSelectorHandler,
    getAddFieldsObject,
    getInitDynamicKeysForm,
    getInitDynamicValuesForm
} from "../../utils/helpers";
import {DynamicFields} from "../DynamicFields/DynamicFields";
import {IconButton, makeStyles} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
        iconButton: {
            minWidth: 30,
            marginTop: '-13px',
            float: 'right',
        },
        icon: {
            fontSize: 30,
            color: 'red',
        },
    })
)

const UpdateCompanyModal = ({
                                onCancel,
                                company,
                                fetchCompanies,
                            }) => {

    const {request} = useHttp();
    const {icon, iconButton} = useStyles();

    const [form, setForm] = useState({
        image: company.image,
        name: company.name,
        price: company.price,
        points: company.points,
        anchorr: company.anchorr,
        article: company.article,
        description: company.description,
    });

    const [dynamicKeysForm, setDynamicKeysForm] = useState(getInitDynamicKeysForm(company));
    const [dynamicValuesForm, setDynamicValuesForm] = useState(getInitDynamicValuesForm(company));


    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    const dynamicKeysFormHandler = (e) => {
        setDynamicKeysForm({...dynamicKeysForm, [e.target.name]: e.target.value})
    };
    const dynamicValuesFormHandler = (e) => {
        setDynamicValuesForm({...dynamicValuesForm, [e.target.name]: e.target.value})
    };
    const updateCompanyHandler = async () => {
        const addFields = getAddFieldsObject(dynamicKeysForm, dynamicValuesForm);
        try {
            const data = await request('/api/companies/update', 'POST', {
                ...form,
                addFields,
                id: company._id
            });
            onCancel(data);
            if (data.status === 'success') {
                swalWithCustom.fire({
                    text: 'Congratulation. You updated the item !!!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                });
                fetchCompanies();
            }
        } catch (e) {
            swalWithCustom.fire({
                text: 'Товар не змінено, перевірте правильність заповнення полів форми !!!',
                icon: 'warning',
                showConfirmButton: true
            });
        }
    };

    const initFieldsCount = company.addFields ? Object.keys(company.addFields) : [];

    return (
        <div className={'modal__overlay'}>
            <div className={'modal__window'}>
                <div className={'modal__header'}>
                    <div className={'modal__title'}>
                        Update Item
                        <IconButton className={iconButton}
                                    onClick={onCancel}>
                            <Close className={icon}/>
                        </IconButton>
                    </div>
                </div>
                <div className={'modal__body'}>
                    <FormFields form={form}
                                formHandler={formHandler}
                                fileSelectorHandler={fileSelectorHandler(setForm)}
                    />
                </div>
                <DynamicFields dynamicKeysForm={dynamicKeysForm}
                               dynamicValuesForm={dynamicValuesForm}
                               dynamicKeysFormHandler={dynamicKeysFormHandler}
                               dynamicValuesFormHandler={dynamicValuesFormHandler}
                               initFieldsCount={initFieldsCount}
                />
                <div className={'modal__footer'}>
                    <button onClick={updateCompanyHandler}>Save updating</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateCompanyModal
