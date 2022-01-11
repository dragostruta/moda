import { findOperationById, deleteOperationById } from "../../../lib/airtable";

const deleteOperation = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      if (id) {
        const recordsFound = await findOperationById(id);
        if (recordsFound.length !== 0) {
          await deleteOperationById(recordsFound[0].id);
          res.json({ message: "Success" });
          res.status(200);
        } else {
          res.json({ message: "Operation could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error deleting or finding operation");
      res.status(500);
      res.json({ message: "Error deleting or finding operation", err });
    }
  }
};

export default deleteOperation;
