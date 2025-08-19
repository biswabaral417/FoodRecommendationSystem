import { Application } from "express";

const startServer = (app: Application, port: string | number) => {
  const host = '0.0.0.0'; // listen on all network interfaces
  const portNumber = typeof port === 'string' ? parseInt(port, 10) : port;

  app.listen(portNumber, host, () => {
    console.log(`🚀 Server running on port ${portNumber}`);
  });
};

export default startServer;
