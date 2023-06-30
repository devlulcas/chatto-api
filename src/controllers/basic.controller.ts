import { Request, Response } from "express";

class BasicController {
  async getSample(_: Request, res: Response) {
    res.send({
      hello: "mom",
    });
  }
}

export default new BasicController();
