import React, {useState} from 'react';
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import {useHttp} from "../../../hooks/http.hook";
import {setInfoModal, setSuccessModal} from "../../../utils/swal/helpers";
import {fileSelectorHandler} from "../../../utils/imgur/helpers";
import {getAddFieldsObject, resetFormsStateHelper} from "../../../helpers/helpers";
import {apiRoutes, apiSubRoutes} from "../../../constants/constants";
import ItemForm from "../../../components/forms/ItemForm";


// styled components
const StyledContainer = styled(Container)`
  &.MuiContainer-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2% auto;
    padding-bottom: 25px;
    background-color: #e1f1f1;
  }
`;


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
        <>
            <StyledContainer container={'main'} maxWidth={'sm'}>
                <h2>Add Item</h2>
                <ItemForm
                    form={form}
                    formHandler={handleForm}
                    fileSelectorHandler={handleSelectFile}
                    dynamicKeysForm={dynamicKeysForm}
                    dynamicValuesForm={dynamicValuesForm}
                    dynamicKeysFormHandler={handleDynamicKeys}
                    dynamicValuesFormHandler={handleDynamicValues}
                    onSaveItem={handleSaveItem}
                />
            </StyledContainer>
        </>

    );
}

export default AddItem;

