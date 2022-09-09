import CombineComponents from "../components/CombineComponents";
import {BasketContextProvider} from "./BasketContext";
import {ScrollContextProvider} from "./ScrollContext";

const providers = [
    BasketContextProvider,
    ScrollContextProvider
];
const ContextProvider = CombineComponents(...providers);

export default ContextProvider;
