export const adminViews = {
    ADD_NEW_ITEM: 'ADD_NEW_ITEM',
    ITEMS_LIST: 'ITEMS_LIST',
    ORDERS_LIST: 'ORDERS_LIST',
}
export const ordersViews = {
    ACTIVE_ORDERS: 'ACTIVE_ORDERS',
    COMPLETED_ORDERS: 'COMPLETED_ORDERS'
}

export const mainRoutes = Object.freeze({
    ABOUT: 'about',
    DELIVERY: 'delivery',
    BASKET: 'basket',
    ADMIN: 'admin'
});

export const subRoutes = Object.freeze({
    PANEL: 'panel',
    ADMIN_BASKET: 'admin_basket',
    LOGIN: 'login'
});

export const apiRoutes = Object.freeze({
    ITEMS: 'api/items',
    AUTH: 'api/auth',
    ORDERS: 'api/orders',
    COUNT: '/api/count',
});

export const apiSubRoutes = Object.freeze({
    REGISTER: 'register',
    LOGIN: 'login',
    SAVE: 'save',
    DELETE: 'delete',
    UPDATE: 'update'
});

export const params = Object.freeze({
    ANCHOR: 'anchor'
});

export const localStorageKeys = Object.freeze({
    AUTH_DATA: 'AUTH_DATA',
    ITEMS_COUNT: 'ITEMS_COUNT',
    BASKET: 'BASKET',
    ADMIN_PANEL_VIEW: 'ADMIN_PANEL_VIEW',
    ORDERS_VIEW: 'ORDERS_VIEW'
});

export const sortModes = Object.freeze({
    LOW: {type: 'low', title: 'Спочатку дешевші'},
    HIGH: {type: 'high', title: 'Спочатку дорожчі'},
    ASC: {type: 'abc', title: 'Сортувати від А...'},
    DESC: {type: 'zyx', title: 'Сортувати від Я...'},
    DEFAULT: {type: '', title: 'Скинути фільтри'}
});
