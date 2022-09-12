import React, {useCallback, useState} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import {useItemsData} from "../../context/ItemsContext";
import {useHttp} from "../../hooks/http.hook";
import {useAuth} from "../../hooks/auth.hook";
import {apiRoutes, mainRoutes} from "../../constants/constants";
import UpdateItemModal from "../modals/UpdateItemModal";
import DeleteModal from "../modals/DeleteModal";
import {Button} from "@material-ui/core";


const AdminPanelContainer = ({children}) => {
    const {items, onSetItems} = useItemsData();
    const {request} = useHttp();
    const {token, logout, ready} = useAuth();

    const [isModalUpdate, setModalUpdate] = useState(false);
    const [isModalDelete, setModalDelete] = useState(false);
    const [itemForModal, setItemForModal] = useState({});

    const fetchItems = useCallback(async () => {
        const data = await request(`/${apiRoutes.ITEMS}`);
        const sortItems = data.sort((a, b) => a.article > b.article ? 1 : a.article < b.article ? -1 : 0);
        onSetItems(sortItems);
    }, [request]);

    const handleUpdateItem = (item) => {
        setItemForModal(item)
        setModalUpdate(true)
    }

    const handleDeleteItem = (item) => {
        setItemForModal(item)
        setModalDelete(true)
    }

    if (!token && ready) {
        return <Redirect to={`/${mainRoutes.ADMIN}`}/>
    }

    return (
        <div>
            {
                isModalUpdate && <UpdateItemModal onCancel={() => setModalUpdate(false)}
                                                  item={itemForModal}
                                                  fetchItems={fetchItems}
                />
            }
            {
                isModalDelete && <DeleteModal onCancel={() => setModalDelete(false)}
                                              item={itemForModal}
                                              fetchItems={fetchItems}
                />
            }
            {
                token && <div>
                    <header className="header header__between header__admin">
                        <div className={"header__logo"}>ADMIN PANEL</div>
                        <div>
                            <NavLink to={'/'}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                >
                                    Go to Items List
                                </Button>
                            </NavLink>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    </header>
                    <div className={'content'}>
                        {React.Children.map(children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, {
                                    fetchItems,
                                    items,
                                    onUpdateItem: handleUpdateItem,
                                    onDeleteItem: handleDeleteItem
                                });
                            }
                            return null;
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default AdminPanelContainer;
