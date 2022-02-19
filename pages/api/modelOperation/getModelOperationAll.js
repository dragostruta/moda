import { findModelOperationAll } from "../../../components/database/modelOperation";

const getModelOperationAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findModelOperationAll();

      res.json(records);
      res.status(200);
    } catch (err) {
      console.error("Error finding model operation");
      res.status(500);
      res.json({ message: "Error finding model operation", err });
    }
  }
};

export default getModelOperationAll;
