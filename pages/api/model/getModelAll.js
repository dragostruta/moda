import { findModelAll } from "../../../components/database/model";

const getModelAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findModelAll();
      records.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });
      res.json(records);
      res.status(200);
    } catch (err) {
      console.error("Error finding model");
      res.status(500);
      res.json({ message: "Error finding model", err });
    }
  }
};

export default getModelAll;
