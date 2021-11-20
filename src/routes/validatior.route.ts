import { Request, Response } from "express";
import { Server } from "../app";
const server = new Server();
const app = server.app;

const router = app.route("/validate");

router.get((req: Request, res: Response) => {
  res.send("validate");
});

export default router;
