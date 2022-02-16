import { findModelById } from "../../../components/database/model";

const getModelById = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const records = await findModelById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          res.json({ message: "model could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding model");
      res.status(500);
      res.json({ message: "Error finding model", err });
    }
  }
};

export default getModelById;
