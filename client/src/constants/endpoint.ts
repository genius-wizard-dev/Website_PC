
const ENDPOINT = {
    LOGIN: `/api/auth/log-in`,
    REGISTER: `/api/customers/register`,
    LOGOUT: `/api/auth/logout`,
    REFRESH_TOKEN: `/api/auth/refresh`,
    INTROSPECT: `/api/auth/introspect`,
    LIST_PRODUCT: `/api/products`,
    PRODUCT_DETAIL: `/api/product-detail`,
    USER_INFO: `/api/customers/info`,
    CART_COUNT: `/api/cart`,
    ADD_TO_CART: `/api/cart`,
    DELETE_CART: `/api/cart/deleteItem`,
    DECREASE_QUANTITY: `/api/cart/decreaseQuantity`,
    INCREASE_QUANTITY: `/api/cart/increaseQuantity`,
    ORDER: `/api/orders`,
    VNPAY: `/api/payment/create_payment`,
    ADMIN: `/api/admin`,
    ADD_PRODUCT: `/api/admin/add-product`,
    UPDATE_PRODUCT: `/api/admin/update-product`,
    DELETE_PRODUCT: `/api/admin/delete-product`,
    UPDATE_PRODUCT_DETAIL: `/api/admin/update-product-detail`,
    LIST_ORDER: `/api/admin/list-orders`,
    UPDATE_PAYMENT_STATUS: `/api/admin/update-payment-status`,
}

export default ENDPOINT;
