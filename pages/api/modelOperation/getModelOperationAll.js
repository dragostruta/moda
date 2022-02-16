import { findModelOperationAll } from "../../../components/database/modelOperation";

const getModelOperationAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findModelOperationAll();

      if (records.length !== 0) {
        res.json(records);
        res.status(200);
      } else {
        res.json({ message: "model operation could not be found" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding model operation");
      res.status(500);
      res.json({ message: "Error finding model operation", err });
    }
  }
};

export default getModelOperationAll;
