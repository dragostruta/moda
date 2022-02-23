import {
  findModelOperationById,
  updateModelOperationByFields,
} from "../../../components/database/modelOperation";

const updateModelOperation = async (req, res) => {
  if (req.method === "PUT") {
    const { id, model_id, operation_id } = req.body;

    try {
      if (id) {
        const initialRecord = await findModelOperationById(id);

        if (initialRecord.length !== 0) {
          if (model_id) {
            const records = await updateModelOperationByFields({
              id: initialRecord[0].id,
              fields: { model_id: model_id, operation_id: operation_id },
            });
            res.json({ records });
          } else {
            res.json({ message: "name is missing" });
            res.status(400);
          }
        } else {
          res.json("there is no model operation with this id");
          res.status(200);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error updating or finding model operation");
      res.status(500);
      res.json({ message: "Error updating or finding model operation", err });
    }
  }
};

export default updateModelOperation;
