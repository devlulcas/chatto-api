import { Request, Response } from "express";

class TopicController {
  async findAll(req: Request, res: Response) {}

  async createLink(req: Request, res: Response) {}
  async createVideo(req: Request, res: Response) {}
  async createText(req: Request, res: Response) {}

  async getLink(req: Request, res: Response) {}
  async getVideo(req: Request, res: Response) {}
  async getText(req: Request, res: Response) {}

  async updateLink(req: Request, res: Response) {}
  async updateVideo(req: Request, res: Response) {}
  async updateText(req: Request, res: Response) {}

  async remove(req: Request, res: Response) {}
}

export default new TopicController();
