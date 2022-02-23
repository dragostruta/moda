import { findModelOperationAll } from "../../../components/database/modelOperation";

const getModelOperationAll = async (req, res) => {
  if (req.method === "GET") {
    const { model_id } = req.query;
    try {
      let records = await findModelOperationAll();
      if (model_id) {
        records = records.filter((item) => item.fields.model_id == model_id);
      }
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
