import {
  findModelById,
  deleteModelById,
} from "../../../components/database/model";

const deleteModel = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      if (id) {
        const recordsFound = await findModelById(id);
        if (recordsFound.length !== 0) {
          await deleteModelById(recordsFound[0].id);
          res.json({ message: "Success" });
          res.status(200);
        } else {
          res.json({ message: "Model could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error deleting or finding model");
      res.status(500);
      res.json({ message: "Error deleting or finding model", err });
    }
  }
};

export default deleteModel;
