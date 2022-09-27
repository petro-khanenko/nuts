import React from 'react';
import {Route, Switch} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import ContextProvider from "./context";
import {mainRoutes, params, subRoutes} from "./constants/constants";
import Content from "./pages/main/Content";
import Auth from "./pages/auth";
import AdminPanel from "./pages/adminPanel";
import AboutItem from "./pages/about";
import Basket from "./pages/basket";
import {AdminBasket} from "./pages/adminBasket";
import Delivery from "./pages/delivery";
import MainContainer from "./components/MainContainer";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <ContextProvider>
                <MainContainer>
                    <Switch>
                        <Route exact path={"/"}
                               render={() => <Content/>}
                        />
                        <Route exact path={`/${mainRoutes.ABOUT}/:${params.ANCHOR}?`}
                               render={() => <AboutItem/>}
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
                               render={() => <AdminPanel/>}
                        />
                        <Route exact path={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}/${subRoutes.ADMIN_BASKET}`}
                               render={() => <AdminBasket/>}
                        />
                    </Switch>
                </MainContainer>
            </ContextProvider>
        </ThemeProvider>
    );
}

export default App;

