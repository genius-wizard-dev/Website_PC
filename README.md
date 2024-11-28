# URL Website

### - Link: https://nonegroup.io.vn/

---

# Public Features

| **Feature**        | **Role** | **Assigned To** | **Folder/Path**                                          |
| ------------------ | -------- | --------------- | -------------------------------------------------------- |
| **Home**           | Full     | Tuyền           | `@/pages/Home.tsx`                                       |
| **About**          | Full     | Tuyền           | `@/pages/About.tsx`                                      |
| **Product**        | Backend  | Minh            | `Product (DAO, Controllers, Entity, DTO, Service)`       |
|                    | Frontend | Việt            | `@/pages/Product.tsx`                                    |
| **Product Detail** | Backend  | Việt            | `ProductDetail (DAO, Controllers, Entity, DTO, Service)` |
|                    | Frontend | Minh            | `@/pages/Product/[id].tsx`                               |
| **Đăng ký**        | Backend  | Hiếu            |                                                          |
|                    | Frontend | Tuyền           | `@/pages/Register.tsx`                                   |
| **Đăng nhập**      | Backend  | Hiếu            |                                                          |
|                    | Frontend | Tuyền           | `@/pages/Login.tsx`                                      |

---

# Private Features

## **User-Specific Pages**

| **Feature**            | **Role** | **Assigned To** | **Folder/Path**                |
| ---------------------- | -------- | --------------- | ------------------------------ |
| **Lịch sử mua hàng**   | Frontend | Hiếu            | `@/pages/Order.tsx`            |
|                        | Backend  | Tuyền           | `Order (Service, Controllers)` |
| **Chi tiết đơn hàng**  | Frontend | Hiếu            | `@/pages/Order/[id].tsx`       |
|                        | Backend  | Tuyền           | `Order (Service, Controllers)` |
| **Giỏ hàng**           | Frontend | Tuyền           | `@/pages/Cart.tsx`             |
|                        | Backend  | Hiếu            |                                |
| **Kết quả thanh toán** | Full     | Minh            | `@/pages/Vnpay`                |

---

## **System Utilities**

| **Feature**            | **Role** | **Assigned To** | **Folder/Path**                 |
| ---------------------- | -------- | --------------- | ------------------------------- |
| **Logout**             | Backend  | Hiếu            |                                 |
| **Layout**             | Frontend | Tuyền           | `@/pages/common`, `@/layouts`   |
| **Redux**              | Frontend | All Members     | `@/redux`                       |
| **Endpoint + Service** | Frontend | All Members     | `@/constants`                   |
| **Page Render**        | Frontend | Thuận           | `@/config/route/PageRender.tsx` |

---

# Admin Features

| **Feature**            | **Role** | **Assigned To** | **Folder/Path**                |
| ---------------------- | -------- | --------------- | ------------------------------ |
| **Quản lý sản phẩm**   | Backend  | Thuận           | `Admin (Service, Controllers)` |
|                        | Frontend | Việt            | `@/pages/Admin/Product.tsx`    |
| **Quản lý người dùng** | Backend  | Việt            | `Admin (Service, Controllers)` |
|                        | Frontend | Thuận           | `@/pages/Admin/Customer.tsx`   |
| **Quản lý đơn hàng**   | Backend  | Thuận           | `Admin (Service, Controllers)` |
|                        | Frontend | Việt            | `@/pages/Admin/Order.tsx`      |

---

# Miscellaneous

| **Feature**         | **Role** | **Assigned To** | **Notes**                                                       |
| ------------------- | -------- | --------------- | --------------------------------------------------------------- |
| **Deploy**          | Full     | Thuận, Hiếu     | Docker, Render (Backend), Netlify (Frontend), Domain (VinaHost) |
| **Xử lý Exception** | Backend  | Hiếu            |                                                                 |
| **Spring Security** | Backend  | Hiếu            |                                                                 |

---

# API Endpoints

| **Key**               | **Endpoint**                  | **Description**                |
| --------------------- | ----------------------------- | ------------------------------ |
| **LOGIN**             | `/api/auth/log-in`            | User login                     |
| **REGISTER**          | `/api/customers/register`     | User registration              |
| **LOGOUT**            | `/api/auth/logout`            | User logout                    |
| **REFRESH_TOKEN**     | `/api/auth/refresh`           | Refresh authentication token   |
| **INTROSPECT**        | `/api/auth/introspect`        | Validate access token          |
| **LIST_PRODUCT**      | `/api/products`               | Get list of products           |
| **PRODUCT_DETAIL**    | `/api/product-detail`         | Get product details            |
| **USER_INFO**         | `/api/customers/info`         | Get user information           |
| **CART_COUNT**        | `/api/cart`                   | Get cart item count            |
| **ADD_TO_CART**       | `/api/cart`                   | Add item to cart               |
| **DELETE_CART**       | `/api/cart/deleteItem`        | Remove item from cart          |
| **DECREASE_QUANTITY** | `/api/cart/decreaseQuantity`  | Decrease item quantity in cart |
| **INCREASE_QUANTITY** | `/api/cart/increaseQuantity`  | Increase item quantity in cart |
| **ORDER**             | `/api/orders`                 | Place an order                 |
| **VNPAY**             | `/api/payment/create_payment` | Create a payment via VNPAY     |

---

# Admin Endpoints

| **Key**                   | **Endpoint**                       | **Description**                   |
| ------------------------- | ---------------------------------- | --------------------------------- |
| **ADMIN**                 | `/api/admin`                       | Admin base route                  |
| **ADD_PRODUCT**           | `/api/admin/add-product`           | Add a new product                 |
| **UPDATE_PRODUCT**        | `/api/admin/update-product`        | Update product details            |
| **DELETE_PRODUCT**        | `/api/admin/delete-product`        | Delete a product                  |
| **UPDATE_PRODUCT_DETAIL** | `/api/admin/update-product-detail` | Update product-specific details   |
| **LIST_ORDER**            | `/api/admin/list-orders`           | Get list of all orders            |
| **UPDATE_PAYMENT_STATUS** | `/api/admin/update-payment-status` | Update payment status of an order |
