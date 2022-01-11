import { findOperationAll } from "../../../lib/airtable";

const getOperationAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findOperationAll();

      if (records.length !== 0) {
        res.json(records);
        res.status(200);
      } else {
        res.json({ message: "operation could not be found" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding operation");
      res.status(500);
      res.json({ message: "Error finding operation", err });
    }
  }
};

export default getOperationAll;
