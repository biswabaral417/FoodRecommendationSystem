import { Request, Response } from "express";

import esewa from "../../utils/esewa/esewa";

export const handlePaymentFailure = (req: Request, res: Response) => {
  try {
    // The middleware esewa.processPaymentFailure is supposed to set transactionUUID on req
    const transactionUUID = (req as any).transactionUUID;

    console.log("Transaction UUID:", transactionUUID);

    const redirectUrl = "http://your_domain.com/failure";
    const messageProps = {
      paymentFailed: "Oops!",
      sorry: "Sorry, your payment failed.",
    };

    // Redirect client to your frontend failure page with message props
    esewa.redirectToClientSite(res, redirectUrl, messageProps);
  } catch (error: any) {
    console.error("Error handling payment failure:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default handlePaymentFailure;