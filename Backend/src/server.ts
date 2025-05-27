import { Application } from "express";

const startServer = (app: Application, port: number | string) => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
};

export default startServer;

