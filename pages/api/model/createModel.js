import {
  findModelById,
  createModelByFields,
} from "../../../components/database/model";

const createModel = async (req, res) => {
  if (req.method === "POST") {
    const { id, name } = req.body;

    try {
      if (id) {
        const records = await findModelById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          console.log(req.body);
          if (name) {
            const records = await createModelByFields({
              id,
              name,
            });
            res.json(records);
          } else {
            res.json({ message: "name is missing" });
            res.status(400);
          }
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error creating or model model");
      res.status(500);
      res.json({ message: "Error creating or finding model", err });
    }
  }
};

export default createModel;
