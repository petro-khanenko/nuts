import React, {useCallback, useEffect, useState} from 'react'
import './App.css'
import Content from "./pages/main/Content/Content"
import Auth from "./pages/admin/Auth/Auth"
import {BrowserRouter, Route, Switch, useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom"
import {useHttp} from "./hooks/http.hook"
import AdminPanel from "./pages/admin/AdminPanel/AdminPanel"
import AboutItem from "./pages/about/AboutItem/AboutItem";
import Basket from "./pages/basket/Basket/Basket";
import {AdminBasket} from "./pages/admin/AdminPanel/AdminBasket/AdminBasket";
import {AdminBasketContextProvider} from "./context/AdminBasketContext";
import Delivery from "./pages/delivery/Delivery/Delivery";
import BasketButton from "./components/BasketButton/BasketButton";


let fetchedCompanies = [];

function App() {

    const [companies, setCompanies] = useState(fetchedCompanies);
    const [item, setItem] = useState(fetchedCompanies);
    const [someShit, setSomeShit] = useState(false);
    const [pageY, setPageY] = useState(0);
    const {request} = useHttp();

    const { pathname } = useLocation();

    const fetchCompanies = useCallback(async () => {
        const data = await request('/api/companies');
        const sortBtArticleData = data.sort((a, b) => a.article > b.article ? 1 : a.article < b.article ? -1 : 0);
        fetchedCompanies = sortBtArticleData;
        setCompanies(sortBtArticleData);
    }, [request]);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const searchText = (e) => {
        let text = e.currentTarget.value.toUpperCase();
        let filterCompaniesN = fetchedCompanies.filter(s => s.name.toUpperCase().includes(text));
        let filterCompaniesD = fetchedCompanies.filter(s => {
            if (s.description) {
                return s.description.toUpperCase().includes(text);
            }
        });
        let filterCompanies = filterCompaniesN.concat(filterCompaniesD);
        if (text.trim().length === 0) {
            setCompanies(fetchedCompanies);
        } else {
            setCompanies(filterCompanies);
        }
    };

    const getItemForAboutPage = (anchorr) => {
        const item = companies.find(item => item.anchorr && item.anchorr === anchorr);
        setItem(item);
    };

    const handleGoToBasket = () => {
        if (pathname === '/') setPageY(window.pageYOffset);
    };

    const showBasket = !pathname.includes('basket') && !pathname.includes('admin');

    return (
        <div>
            <AdminBasketContextProvider>
                <div className={'app'}>
                    {
                        showBasket && <BasketButton handleGoToBasket={handleGoToBasket}/>
                    }
                    <Switch>
                        <Route exact path={"/"}
                               render={() => <Content companies={companies}
                                                      searchText={searchText}
                                                      pageY={pageY}
                                                      handleGoToBasket={handleGoToBasket}
                                                      setSomeShit={setSomeShit}
                                                      someShit={someShit}
                               />}
                        />
                        <Route exact path={"/about/:anchorr?"}
                               render={() => <AboutItem
                                   item={item}
                                   getItemForAboutPage={getItemForAboutPage}
                                   someShit={someShit}
                                   setSomeShit={setSomeShit}/>}
                        />
                        <Route exact path={"/delivery"}
                               render={() => <Delivery/>}
                        />
                        <Route exact path={"/basket"}
                               render={() => <Basket someShit={someShit} setSomeShit={setSomeShit}/>}
                        />
                        <Route exact path={"/admin"}
                               render={() => <Auth/>}
                        />
                        <Route exact path={"/admin/panel"}
                               render={() => <AdminPanel companies={companies} fetchCompanies={fetchCompanies}/>}
                        />
                        <Route exact path={"/admin/panel/admin_basket"}
                               render={() => <AdminBasket someShit={someShit}
                                                          setSomeShit={setSomeShit}
                                                          companies={companies}
                               />}
                        />
                    </Switch>
                </div>
            </AdminBasketContextProvider>
        </div>
    )
}

export default App

