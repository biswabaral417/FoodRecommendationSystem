import initiatePayment from "../controller/esewa/initiatePayment";
import handlePaymentFailure from "../controller/esewa/paymentFailure";
import handlePaymentSuccess from "../controller/esewa/paymentSuccess";
import esewa from "../utils/esewa/esewa";

const  express = require('express'); 
// create foods routes 
const router = express.Router();



router.get('/initiate_payment',initiatePayment);
router.get('/payment/success',esewa.processPaymentSuccess,handlePaymentSuccess);
router.get('/payment/failure',esewa.processPaymentFailure, handlePaymentFailure);
// router.post('/initiate_payment', initiatePayment);
export default router;