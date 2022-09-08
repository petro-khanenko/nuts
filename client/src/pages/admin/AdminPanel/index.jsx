import React, {useState} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import {fileSelectorHandler} from "../../../utils/imgur/helpers";
import {setInfoModal, setSuccessModal} from "../../../utils/swal/helpers";
import {useHttp} from "../../../hooks/http.hook";
import {useAuth} from "../../../hooks/auth.hook";
import {getAddFieldsObject, resetFormsStateHelper} from "../../../helpers/helpers";
import {adminPages, apiRoutes, apiSubRoutes, mainRoutes} from "../../../constants/constants";
import ItemRemastering from "../ItemRemastering"
import UpdateItemModal from "../../../components/modals/UpdateItemModal";
import DeleteModal from "../../../components/modals/DeleteModal";
import {DynamicFields} from "../../../components/DynamicFields";
import {FormFields} from "../../../components/FormFields";
import {AdminPagesSwitcher} from "./AdminPagesSwitcher";
import {Orders} from "../../orders";


const AdminPanel = ({items, fetchItems}) => {

    const [switchMode, setSwitchMode] = useState(adminPages.ORDERS_LIST)
    const [isModalUpdate, setModalUpdate] = useState(false)
    const [isModalDelete, setModalDelete] = useState(false)
    const [dynamicKeysForm, setDynamicKeysForm] = useState({})
    const [dynamicValuesForm, setDynamicValuesForm] = useState({})
    const [itemForModal, setItemForModal] = useState({})
    const [form, setForm] = useState({})

    const {request} = useHttp()
    const {token, logout} = useAuth()

    const handleUpdateItem = (item) => {
        setItemForModal(item)
        setModalUpdate(true)
    }

    const handleDeleteItem = (item) => {
        setItemForModal(item)
        setModalDelete(true)
    }

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleDynamicKeysForm = (e) => {
        setDynamicKeysForm({...dynamicKeysForm, [e.target.name]: e.target.value})
    }

    const handleDynamicValuesForm = (e) => {
        setDynamicValuesForm({...dynamicValuesForm, [e.target.name]: e.target.value})
    }

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

    if (token === null) {
        return <Redirect to={`/${mainRoutes.ADMIN}`}/>
    }

    return (
        <div>
            {isModalUpdate && <UpdateItemModal onCancel={() => setModalUpdate(false)}
                                               item={itemForModal}
                                               fetchItems={fetchItems}
            />}
            {isModalDelete && <DeleteModal onCancel={() => setModalDelete(false)}
                                           item={itemForModal}
                                           fetchItems={fetchItems}
            />}
            {token && <div>
                <header className="header header__between header__admin">
                    <div className={"header__logo"}>Admin Panel</div>
                    <div>
                        <NavLink to={'/'}>
                            <button>Go to Items List</button>
                        </NavLink>
                        <button onClick={logout}>Logout</button>
                    </div>
                </header>
                <div className={'content'}>
                    <AdminPagesSwitcher switchMode={switchMode} setSwitchMode={setSwitchMode}/>
                    {switchMode === adminPages.ADD_NEW_ITEM && <div className={'admin-panel'}>
                        <h2>Add Item</h2>
                        <FormFields form={form}
                                    formHandler={handleForm}
                                    fileSelectorHandler={fileSelectorHandler(setForm)}
                        />
                        <DynamicFields dynamicKeysForm={dynamicKeysForm}
                                       dynamicValuesForm={dynamicValuesForm}
                                       dynamicKeysFormHandler={handleDynamicKeysForm}
                                       dynamicValuesFormHandler={handleDynamicValuesForm}

                        />
                        <button className="admin-panel__save-button"
                                onClick={handleSaveItem}
                        >
                            Save
                        </button>
                    </div>}
                    {switchMode === adminPages.ITEMS_LIST && <div className={'admin-panel'}>
                        <h2>Delete or Update Item</h2>
                        <div>
                            {items.map((item, idx) => <ItemRemastering item={item}
                                                                       idx={idx}
                                                                       onDeleteItem={handleDeleteItem}
                                                                       onUpdateItem={handleUpdateItem}
                            />)}
                        </div>
                    </div>}
                    {
                        switchMode === adminPages.ORDERS_LIST && <Orders/>
                    }
                </div>
            </div>}
        </div>
    );
}

export default AdminPanel;
