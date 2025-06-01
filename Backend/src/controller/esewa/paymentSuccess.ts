import { Request, Response } from "express";
import esewa from "../../utils/esewa/esewa";

export const handlePaymentSuccess = async (req: Request, res: Response) => {
  esewa.processPaymentSuccess(req, res, () => {
    try {
      // Use query or params depending on how esewa sends the data (usually query for GET)
      const { transaction_uuid, amount, ...otherFields } = req.query;

      console.log("Transaction UUID:", transaction_uuid);
      console.log("Amount:", amount);

      // Prepare redirect URL and message properties to send to client
      const redirectUrl = "http://your_domain.com/success";
      const messageProps = {
        paymentSuccess: "Yay!",
        thanks: "Thank you for your order!",
      };

      // Use esewa helper to redirect client with message props
      esewa.redirectToClientSite(res, redirectUrl, messageProps);
    } catch (error: any) {
      console.error("Error handling payment success:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }})
};
export default handlePaymentSuccess;