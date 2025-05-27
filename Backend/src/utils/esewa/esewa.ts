const EsewaIntegration = require("esewa-integration-server");

// Initialize with custom configuration
const esewa = new EsewaIntegration({
  secretKey: process.env.ESEWA_SECRET_KEY || "your-esewa-secret-key", // Your eSewa secret key
  successUrl: "https://localhost:9000/api/esewa/payment/success", // URL to handle successful payments
  failureUrl: "https://yourdomain:9000/api/esewa/payment/failure", // URL to handle failed payments
});
export default esewa;