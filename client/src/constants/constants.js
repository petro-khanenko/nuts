export const adminPages = {
    ADD_NEW_ITEM: 'ADD_NEW_ITEM',
    ITEMS_LIST: 'ITEMS_LIST',
    ORDERS_LIST: 'ORDERS_LIST',
}
export const orderPages = {
    ACTIVE_ORDERS: 'ACTIVE_ORDERS',
    COMPLETED_ORDERS: 'COMPLETED_ORDERS',
    ADMIN_BASKET: 'ADMIN_BASKET',
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
    ITEMS: 'ITEMS',
    BASKET: 'BASKET',
    ORDER_PAGE: 'ORDER_PAGE'
});

export const priceModes = Object.freeze({
    LOW: 'low',
    HIGH: 'high',
    ASC: 'abc',
    DESC: 'zyx'
});