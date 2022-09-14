import CombineComponents from "../components/CombineComponents";
import {ItemsContextProvider} from "./ItemsContext";
import {BasketContextProvider} from "./BasketContext";
import {ScrollContextProvider} from "./ScrollContext";
import {FiltersContextProvider} from "./FiltersContext";
import {OrderDataProvider} from "./OrderContext";

const providers = [
    ItemsContextProvider,
    BasketContextProvider,
    ScrollContextProvider,
    FiltersContextProvider,
    OrderDataProvider
];
const ContextProvider = CombineComponents(...providers);

export default ContextProvider;
