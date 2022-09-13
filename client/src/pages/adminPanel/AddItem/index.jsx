import React, {useState} from 'react';
import {DynamicFields} from "../../../components/DynamicFields";
import {FormFields} from "../../../components/FormFields";
import {fileSelectorHandler} from "../../../utils/imgur/helpers";
import {getAddFieldsObject, resetFormsStateHelper} from "../../../helpers/helpers";
import {apiRoutes, apiSubRoutes} from "../../../constants/constants";
import {setInfoModal, setSuccessModal} from "../../../utils/swal/helpers";
import {useHttp} from "../../../hooks/http.hook";


const AddItem = ({fetchItems}) => {
    const {request} = useHttp();

    const [form, setForm] = useState({});
    const [dynamicKeysForm, setDynamicKeysForm] = useState({});
    const [dynamicValuesForm, setDynamicValuesForm] = useState({});

    // Handlers
    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleDynamicKeys = (e) => {
        setDynamicKeysForm({...dynamicKeysForm, [e.target.name]: e.target.value})
    }
    const handleDynamicValues = (e) => {
        setDynamicValuesForm({...dynamicValuesForm, [e.target.name]: e.target.value})
    }
    const handleSelectFile = () => fileSelectorHandler(setForm);
    const handleSaveItem = async () => {
        const addFields = getAddFieldsObject(dynamicKeysForm, dynamicValuesForm);
        try {
            const data = await request(`/${apiRoutes.ITEMS}/${apiSubRoutes.SAVE}`, 'POST', {
                ...form,
                addFields
            });
            setForm(resetFormsStateHelper);
            setDynamicKeysForm(resetFormsStateHelper);
            setDynamicValuesForm(resetFormsStateHelper);
            if (data.status === 'success') {
                setSuccessModal('Вітаємо. Ви додали новий товар !!!');
                fetchItems();
            }
        } catch (e) {
            setInfoModal(
                'Товар не збережено, перевірте правильність заповнення полів форми !!!',
                'warning'
            );
        }
    }

    return (
        <div className={'admin-panel'}>
            <h2>Add Item</h2>
            <FormFields form={form}
                        formHandler={handleForm}
                        fileSelectorHandler={handleSelectFile}
            />
            <DynamicFields dynamicKeysForm={dynamicKeysForm}
                           dynamicValuesForm={dynamicValuesForm}
                           dynamicKeysFormHandler={handleDynamicKeys}
                           dynamicValuesFormHandler={handleDynamicValues}

            />
            <button className="admin-panel__save-button"
                    onClick={handleSaveItem}
            >
                Save
            </button>
        </div>

    );
}

export default AddItem;

