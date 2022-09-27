import React, {useCallback} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import {useItemsData} from "../context/ItemsContext";
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {apiRoutes, mainRoutes} from "../constants/constants";
import {Button} from "@material-ui/core";


const AdminPanelContainer = ({children}) => {
    const {items, onSetItems} = useItemsData();
    const {request} = useHttp();
    const {token, logout, ready} = useAuth();

    const fetchItems = useCallback(async () => {
        const data = await request(`/${apiRoutes.ITEMS}`);
        const sortItems = data.sort((a, b) => a.article > b.article ? 1 : a.article < b.article ? -1 : 0);
        onSetItems(sortItems);
    }, [request]);

    if (!token && ready) {
        return <Redirect to={`/${mainRoutes.ADMIN}`}/>
    }

    return (
        <div>
            {
                token && <div>
                    <header className="header__bottom header__between header__admin">
                        <div className={"header__logo"}>ADMIN PANEL</div>
                        <div>
                            <NavLink to={'/'}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                >
                                    Go to Main
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
                                    items,
                                    fetchItems
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
