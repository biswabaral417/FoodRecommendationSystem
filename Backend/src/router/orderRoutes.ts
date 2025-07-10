import { Router } from 'express';
import { authorize } from '../controller/user/tokenAuth';
import createOrder from '../controller/orders/createOrder';
import getAllOrders from '../controller/orders/getAllOrder';

const orderRoutes = Router();

// orderRoutes.post('/login', login);
// orderRoutes.post('/register', register)
// orderRoutes.post('/verify_refresh_token', verify_refresh_token)
orderRoutes.post('/create_order', authorize, createOrder)
orderRoutes.get('/get_all_orders', authorize, getAllOrders);

export default orderRoutes; 