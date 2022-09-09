import CombineComponents from "../components/CombineComponents";
import {ItemsContextProvider} from "./ItemsContext";
import {BasketContextProvider} from "./BasketContext";
import {ScrollContextProvider} from "./ScrollContext";
import {SearchContextProvider} from "./SearchContext";

const providers = [
    ItemsContextProvider,
    BasketContextProvider,
    ScrollContextProvider,
    SearchContextProvider
];
const ContextProvider = CombineComponents(...providers);

export default ContextProvider;
