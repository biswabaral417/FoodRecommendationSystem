import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";  // npm install uuid
import esewa from "../../utils/esewa/esewa";

const initiatePayment = async (req: Request, res: Response):Promise<any> => {
  try {
    // Get total_amount from query or body, prefer body if you want POST
    const total_amount = req.query.total_amount || req.body.total_amount;
    if (!total_amount) {
      return res.status(400).json({ error: "total_amount is required" });
    }

    // Generate a unique UUID for the transaction
    const transactionUUID = uuidv4();

    // Initiate eSewa payment
    esewa.initiatePayment(
      {
        total_amount: Number(total_amount), // ensure it's a number
        transactionUUID,
        amount: Number(total_amount), // amount to pay
        productCode: "EPAYTEST",
        // You can add other optional fields if needed
        // productDeliveryCharge: 0,
        // productServiceCharge: 0,
        // taxAmount: 0,
      },
      res
    );
  } catch (error: any) {
    console.error("Error initiating payment:", error.message);
    res.status(500).json({ error: "Failed to initiate payment." });
  }
};

export default initiatePayment;
