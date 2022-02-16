import { findModelAll } from "../../../components/database/employees";

const getModelAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findModelAll();

      if (records.length !== 0) {
        res.json(records);
        res.status(200);
      } else {
        res.json({ message: "employee could not be found" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding model");
      res.status(500);
      res.json({ message: "Error finding model", err });
    }
  }
};

export default getModelAll;
