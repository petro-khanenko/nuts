import CombineComponents from "../components/CombineComponents";
import {ItemsContextProvider} from "./ItemsContext";
import {BasketContextProvider} from "./BasketContext";
import {ScrollContextProvider} from "./ScrollContext";
import {FiltersContextProvider} from "./FiltersContext";

const providers = [
    ItemsContextProvider,
    BasketContextProvider,
    ScrollContextProvider,
    FiltersContextProvider
];
const ContextProvider = CombineComponents(...providers);

export default ContextProvider;
