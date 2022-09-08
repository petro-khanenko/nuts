import React, {useCallback, useEffect, useState} from 'react'
import './App.css'
import Content from "./pages/main/Content"
import Auth from "./pages/admin/Auth"
import {Route, Switch, useLocation} from "react-router-dom"
import {useHttp} from "./hooks/http.hook"
import AdminPanel from "./pages/admin/AdminPanel"
import AboutItem from "./pages/about/AboutItem";
import Basket from "./pages/basket/Basket";
import {AdminBasket} from "./pages/admin/AdminPanel/AdminBasket";
import {AdminBasketContextProvider} from "./context/AdminBasketContext";
import Delivery from "./pages/delivery/Delivery";
import BasketButton from "./components/BasketButton";
import {apiRoutes, mainRoutes, params, subRoutes} from "./constants/constants";


let fetchedItems = [];

function App() {

    const [items, setItems] = useState(fetchedItems);
    const [item, setItem] = useState(null);
    const [someShit, setSomeShit] = useState(false);
    const [pageY, setPageY] = useState(0);

    const {request} = useHttp();
    const {pathname} = useLocation();

    const fetchItems = useCallback(async () => {
        const data = await request(`/${apiRoutes.ITEMS}`);
        const sortBtArticleData = data.sort((a, b) => a.article > b.article ? 1 : a.article < b.article ? -1 : 0);
        fetchedItems = sortBtArticleData;
        setItems(sortBtArticleData);
    }, [request]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const searchText = (e) => {
        let text = e.currentTarget.value.toUpperCase();
        let filterCompaniesN = fetchedItems.filter(s => s.name.toUpperCase().includes(text));
        let filterCompaniesD = fetchedItems.filter(s => {
            if (s.description) {
                return s.description.toUpperCase().includes(text);
            }
        });
        let filterCompanies = filterCompaniesN.concat(filterCompaniesD);
        if (text.trim().length === 0) {
            setItems(fetchedItems);
        } else {
            setItems(filterCompanies);
        }
    };

    const getItemForAboutPage = (anchor) => {
        const item = items.find(item => item.anchorr && item.anchorr === anchor);
        setItem(item);
    };

    const handleGoToBasket = () => {
        if (pathname === '/') setPageY(window.pageYOffset);
    };

    const showBasket = !pathname.includes(mainRoutes.BASKET) && !pathname.includes(mainRoutes.ADMIN);

    return (
        <div>
            <AdminBasketContextProvider>
                <div className={'app'}>
                    {
                        showBasket && <BasketButton handleGoToBasket={handleGoToBasket}/>
                    }
                    <Switch>
                        <Route exact path={"/"}
                               render={() => <Content items={items}
                                                      searchText={searchText}
                                                      pageY={pageY}
                                                      handleGoToBasket={handleGoToBasket}
                                                      setSomeShit={setSomeShit}
                                                      someShit={someShit}
                               />}
                        />
                        <Route exact path={`/${mainRoutes.ABOUT}/:${params.ANCHOR}?`}
                               render={() => <AboutItem
                                   item={item}
                                   getItemForAboutPage={getItemForAboutPage}
                                   someShit={someShit}
                                   setSomeShit={setSomeShit}
                               />}
                        />
                        <Route exact path={`/${mainRoutes.DELIVERY}`}
                               render={() => <Delivery/>}
                        />
                        <Route exact path={`/${mainRoutes.BASKET}`}
                               render={() => <Basket someShit={someShit} setSomeShit={setSomeShit}/>}
                        />
                        <Route exact path={`/${mainRoutes.ADMIN}`}
                               render={() => <Auth/>}
                        />
                        <Route exact path={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}`}
                               render={() => <AdminPanel items={items} fetchItems={fetchItems}/>}
                        />
                        <Route exact path={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}/${subRoutes.ADMIN_BASKET}`}
                               render={() => <AdminBasket someShit={someShit}
                                                          setSomeShit={setSomeShit}
                                                          companies={items}
                               />}
                        />
                    </Switch>
                </div>
            </AdminBasketContextProvider>
        </div>
    );
}

export default App;

