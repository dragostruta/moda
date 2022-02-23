import { findModelOperationById } from "../../../components/database/modelOperation";

const getModelOperationById = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const records = await findModelOperationById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          res.json({ message: "model operation could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding model operation");
      res.status(500);
      res.json({ message: "Error finding model operation", err });
    }
  }
};

export default getModelOperationById;
