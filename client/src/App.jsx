import React, {useCallback, useEffect, useState} from 'react'
import './App.css'
import Content from "./pages/main/Content"
import Auth from "./pages/admin/Auth"
import {Route, Switch} from "react-router-dom"
import {useHttp} from "./hooks/http.hook"
import AdminPanel from "./pages/admin/AdminPanel"
import AboutItem from "./pages/about/AboutItem";
import Basket from "./pages/basket/Basket";
import {AdminBasket} from "./pages/admin/AdminPanel/AdminBasket";
import Delivery from "./pages/delivery/Delivery";
import {apiRoutes, mainRoutes, params, subRoutes} from "./constants/constants";
import MainLayout from "./components/MainLayout";
import ContextProvider from "./context";


let fetchedItems = [];

function App() {

    const [items, setItems] = useState(fetchedItems);
    const [item, setItem] = useState(null);

    const {request} = useHttp();

    const fetchItems = useCallback(async () => {
        const data = await request(`/${apiRoutes.ITEMS}`);
        const sortBtArticleData = data.sort((a, b) => a.article > b.article ? 1 : a.article < b.article ? -1 : 0);
        fetchedItems = sortBtArticleData;
        setItems(sortBtArticleData);
    }, [request]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);


    const getItemForAboutPage = (anchor) => {
        const item = items.find(item => item.anchorr && item.anchorr === anchor);
        setItem(item);
    };

    return (
        <ContextProvider>
            <MainLayout>
                <Switch>
                    <Route exact path={"/"}
                           render={() => <Content items={items}
                           />}
                    />
                    <Route exact path={`/${mainRoutes.ABOUT}/:${params.ANCHOR}?`}
                           render={() => <AboutItem
                               item={item}
                               getItemForAboutPage={getItemForAboutPage}
                           />}
                    />
                    <Route exact path={`/${mainRoutes.DELIVERY}`}
                           render={() => <Delivery/>}
                    />
                    <Route exact path={`/${mainRoutes.BASKET}`}
                           render={() => <Basket/>}
                    />
                    <Route exact path={`/${mainRoutes.ADMIN}`}
                           render={() => <Auth/>}
                    />
                    <Route exact path={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}`}
                           render={() => <AdminPanel items={items} fetchItems={fetchItems}/>}
                    />
                    <Route exact path={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}/${subRoutes.ADMIN_BASKET}`}
                           render={() => <AdminBasket allItems={items}/>}
                    />
                </Switch>
            </MainLayout>
        </ContextProvider>
    );
}

export default App;

