import React, {useState} from 'react'
import {useHttp} from "../../hooks/http.hook"
import {FormFields} from "../forms/ItemForm/ItemFormFields";
import {getAddFieldsObject, getInitDynamicKeysForm, getInitDynamicValuesForm} from "../../helpers/helpers";
import {DynamicFields} from "../forms/ItemForm/DymamicFields";
import {IconButton, makeStyles} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {fileSelectorHandler} from "../../utils/imgur/helpers";
import {setInfoModal, setSuccessModal} from "../../utils/swal/helpers";
import {apiRoutes, apiSubRoutes} from "../../constants/constants";

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

const UpdateItemModal = ({
                                onCancel,
                                item,
                                fetchItems,
                            }) => {

    const {request} = useHttp();
    const {icon, iconButton} = useStyles();

    const [form, setForm] = useState({
        image: item.image,
        name: item.name,
        price: item.price,
        points: item.points,
        anchorr: item.anchorr,
        article: item.article,
        description: item.description,
    });

    const [dynamicKeysForm, setDynamicKeysForm] = useState(getInitDynamicKeysForm(item));
    const [dynamicValuesForm, setDynamicValuesForm] = useState(getInitDynamicValuesForm(item));


    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };
    const dynamicKeysFormHandler = (e) => {
        setDynamicKeysForm({...dynamicKeysForm, [e.target.name]: e.target.value})
    };
    const dynamicValuesFormHandler = (e) => {
        setDynamicValuesForm({...dynamicValuesForm, [e.target.name]: e.target.value})
    };
    const updateItemHandler = async () => {
        const addFields = getAddFieldsObject(dynamicKeysForm, dynamicValuesForm);
        try {
            const data = await request(`/${apiRoutes.ITEMS}/${apiSubRoutes.UPDATE}`, 'PUT', {
                ...form,
                addFields,
                id: item._id
            });
            onCancel(data);
            if (data.status === 'success') {
                setSuccessModal('Вітаємо. Замовлення успішно оновлене !!!');
                fetchItems();
            }
        } catch (e) {
            setInfoModal(
                'Товар не змінено, перевірте правильність заповнення полів форми !!!',
                'warning'
            );
        }
    };

    const initFieldsCount = item.addFields ? Object.keys(item.addFields) : [];

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
                    <button onClick={updateItemHandler}>Save updating</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateItemModal
