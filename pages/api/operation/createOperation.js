import {
  findOperationById,
  createOperationByFields,
} from "../../../components/database/operations";

const createOperation = async (req, res) => {
  if (req.method === "POST") {
    const { id, Name } = req.body;

    try {
      if (id) {
        const records = await findOperationById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          if (Name) {
            const records = await createOperationByFields(req.body);
            res.json(records);
          } else {
            res.json({ message: "name is missing" });
            res.status(400);
          }
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500);
      res.json({ message: "Error creating or finding operation", err });
    }
  }
};

export default createOperation;
