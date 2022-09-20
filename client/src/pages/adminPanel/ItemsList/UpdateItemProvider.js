import React, {useState} from 'react'
import {apiRoutes, apiSubRoutes} from "../../../constants/constants";
import {useHttp} from "../../../hooks/http.hook";
import {getAddFieldsObject, getInitDynamicKeysForm, getInitDynamicValuesForm} from "../../../helpers/helpers";
import {setInfoModal, setSuccessModal} from "../../../utils/swal/helpers";
import {fileSelectorHandler} from "../../../utils/imgur/helpers";


const UpdateItemProvider = ({
                                onCancel,
                                item,
                                fetchItems,
                                children
                            }) => {

    const {request} = useHttp();

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
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        form,
                        formHandler,
                        fileSelectorHandler: fileSelectorHandler(setForm),
                        dynamicKeysForm,
                        dynamicValuesForm,
                        dynamicKeysFormHandler,
                        dynamicValuesFormHandler,
                        initFieldsCount,
                        onSaveItem: updateItemHandler
                    });
                }
                return null;
            })}
        </>
    );
}

export default UpdateItemProvider