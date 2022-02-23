import {
  findModelOperationById,
  deleteModelOperationById,
} from "../../../components/database/modelOperation";

const deleteModelOperation = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      if (id) {
        const recordsFound = await findModelOperationById(id);
        if (recordsFound.length !== 0) {
          await deleteModelOperationById(recordsFound[0].id);
          res.json({ message: "Success" });
          res.status(200);
        } else {
          res.json({ message: "Model Operation could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error deleting or finding model operation");
      res.status(500);
      res.json({ message: "Error deleting or finding model operation", err });
    }
  }
};

export default deleteModelOperation;
