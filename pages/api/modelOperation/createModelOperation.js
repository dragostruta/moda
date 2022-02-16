import {
  findModelOperationById,
  createModelOperationByFields,
} from "../../../components/database/modelOperation";

const createModelOperation = async (req, res) => {
  if (req.method === "POST") {
    const { id, model_id, operation_id } = req.body;

    try {
      if (id) {
        const records = await findModelOperationById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          if (model_id) {
            const records = await createModelOperationByFields({
              id,
              model_id: model_id,
              operation_id: operation_id,
            });
            res.json(records);
          } else {
            res.json({ message: "modelId is missing" });
            res.status(400);
          }
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error creating or finding model operation");
      res.status(500);
      res.json({ message: "Error creating or finding model operation", err });
    }
  }
};

export default createModelOperation;
