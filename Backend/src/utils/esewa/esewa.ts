import { EsewaIntegration } from "esewa-integration-server";


const esewa = new EsewaIntegration({
  secretKey: "your-esewa-secret-key",
  successUrl: "https://yourdomain.com/payment-success",
  failureUrl: "https://yourdomain.com/payment-failure",
  secure: true,
  sameSite: "lax",
});
export default esewa;