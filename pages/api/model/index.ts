// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import findModel from "../../../utils/findModel";
import writeModel from "../../../utils/writeModel";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const { path } = req.query as { path: string };

    const result = findModel(path);

    res.status(200).send(result);
  }

  if (req.method === "PATCH") {
    const { component, page } = req.body as { component: any; page: string };

    const modelExists = findModel(page);

    if (!modelExists) {
      return res.status(400).json({});
    }

    const model = JSON.parse(modelExists);

    model.components = model.components.map((item: any) =>
      item.id === component.id ? component : item
    );

    writeModel(page, model);

    return res.status(200).json(model);
  }

  if (req.method === "DELETE") {
    const { id, page } = req.body as { id: string; page: string };

    const modelExists = findModel(page);

    if (!modelExists) {
      return res.status(400).json({});
    }

    const model = JSON.parse(modelExists);

    const components: any[] = [];

    model.components = model.components.map((item: any) => {
      if (item.id !== id) {
        components.push(item);
      }
    });

    model.components = components;

    writeModel(page, model);

    return res.status(200).json(model);
  }

  return res.status(404);
}
