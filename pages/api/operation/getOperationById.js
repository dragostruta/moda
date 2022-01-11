import { findOperationById } from "../../../lib/airtable";

const getOperationById = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const records = await findOperationById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          res.json({ message: "operation could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding operation");
      res.status(500);
      res.json({ message: "Error finding operation", err });
    }
  }
};

export default getOperationById;
