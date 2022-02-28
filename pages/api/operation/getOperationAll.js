import { findOperationAll } from "../../../components/database/operations";

const getOperationAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findOperationAll();
      res.json(records);
      res.status(200);
    } catch (err) {
      console.error("Error finding operation");
      res.status(500);
      res.json({ message: "Error finding operation", err });
    }
  }
};

export default getOperationAll;
