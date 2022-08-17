import React, {useState} from 'react'
import {useHttp} from "../../../hooks/http.hook";
import {useAuth} from "../../../hooks/auth.hook";
import {NavLink, Redirect} from "react-router-dom";
import CompanyRemastering from "../CompanyRemastering/CompanyRemastering"
import UpdateCompanyModal from "../../../components/modals/UpdateCompanyModal";
import DeleteModal from "../../../components/modals/DeleteModal";
import {fileSelectorHandler, getAddFieldsObject, resetFormsStateHelper} from "../../../utils/helpers";
import {swalWithCustom} from "../../../utils/swal/swalWithCustom";
import {DynamicFields} from "../../../components/DynamicFields/DynamicFields";
import {FormFields} from "../../../components/FormFields/FormFields";
import {adminPages} from "../../../constants/constants";
import {AdminPagesSwitcher} from "./AdminPagesSwitcher";
import {Orders} from "../../orders/Orders";


const AdminPanel = ({companies, fetchCompanies}) => {

    const [switchMode, setSwitchMode] = useState(adminPages.ORDERS_LIST)
    const [isModalUpdate, setModalUpdate] = useState(false)
    const [isModalDelete, setModalDelete] = useState(false)
    const [dynamicKeysForm, setDynamicKeysForm] = useState({})
    const [dynamicValuesForm, setDynamicValuesForm] = useState({})
    const [companyForModal, setCompanyForModal] = useState({})
    const [form, setForm] = useState({})

    const {request} = useHttp()
    const {token, logout} = useAuth()

    const updateCompany = (company) => {
        setCompanyForModal(company)
        setModalUpdate(true)
    }

    const deleteCompany = (company) => {
        setCompanyForModal(company)
        setModalDelete(true)
    }

    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const dynamicKeysFormHandler = (e) => {
        setDynamicKeysForm({...dynamicKeysForm, [e.target.name]: e.target.value})
    }

    const dynamicValuesFormHandler = (e) => {
        setDynamicValuesForm({...dynamicValuesForm, [e.target.name]: e.target.value})
    }

    const saveCompanyHandler = async () => {
        const addFields = getAddFieldsObject(dynamicKeysForm, dynamicValuesForm);
        try {
            const data = await request('/api/companies/save', 'POST', {
                ...form,
                addFields
            })
            setForm(resetFormsStateHelper);
            setDynamicKeysForm(resetFormsStateHelper);
            setDynamicValuesForm(resetFormsStateHelper);
            if (data.status === 'success') {
                swalWithCustom.fire({
                    text: 'Congratulation. You added new item !!!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                });
                fetchCompanies()
            }
        } catch (e) {
            swalWithCustom.fire({
                text: 'Товар не збережено, перевірте правильність заповнення полів форми !!!',
                icon: 'warning',
                showConfirmButton: true
            });
        }
    }

    if (token === null) {
        return <Redirect to={'/admin'}/>
    }

    return (
        <div>
            {isModalUpdate && <UpdateCompanyModal onCancel={() => setModalUpdate(false)}
                                                  company={companyForModal}
                                                  fetchCompanies={fetchCompanies}
            />}
            {isModalDelete && <DeleteModal onCancel={() => setModalDelete(false)}
                                           company={companyForModal}
                                           fetchCompanies={fetchCompanies}
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
                                    formHandler={formHandler}
                                    fileSelectorHandler={fileSelectorHandler(setForm)}
                        />
                        <DynamicFields dynamicKeysForm={dynamicKeysForm}
                                       dynamicValuesForm={dynamicValuesForm}
                                       dynamicKeysFormHandler={dynamicKeysFormHandler}
                                       dynamicValuesFormHandler={dynamicValuesFormHandler}

                        />
                        <button className="admin-panel__save-button"
                                onClick={saveCompanyHandler}
                        >Save
                        </button>
                    </div>}
                    {switchMode === adminPages.ITEMS_LIST && <div className={'admin-panel'}>
                        <h2>Delete or Update Item</h2>
                        <div>
                            {companies.map((company, idx) => <CompanyRemastering company={company}
                                                                                 idx={idx}
                                                                                 deleteCompany={deleteCompany}
                                                                                 updateCompany={updateCompany}
                            />)}
                        </div>
                    </div>}
                    {
                        switchMode === adminPages.ORDERS_LIST && <Orders />
                    }
                </div>
            </div>}
        </div>
    )
}

export default AdminPanel
