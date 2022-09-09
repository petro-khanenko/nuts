import CombineComponents from "../components/CombineComponents";
import {BasketContextProvider} from "./BasketContext";
import {ScrollContextProvider} from "./ScrollContext";
import {SearchContextProvider} from "./SearchContext";

const providers = [
    BasketContextProvider,
    ScrollContextProvider,
    SearchContextProvider
];
const ContextProvider = CombineComponents(...providers);

export default ContextProvider;
