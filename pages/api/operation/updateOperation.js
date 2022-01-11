import {
  findOperationById,
  updateOperationByFields,
} from "../../../lib/airtable";

const updateOperation = async (req, res) => {
  if (req.method === "PUT") {
    const { id, Name } = req.body;

    try {
      if (id) {
        const initialRecord = await findOperationById(id);

        if (initialRecord.length !== 0) {
          if (Name) {
            const records = await updateOperationByFields({
              id: initialRecord[0].id,
              fields: { id, Name },
            });
            res.json({ records });
          } else {
            res.json({ message: "name is missing" });
            res.status(400);
          }
        } else {
          res.json("there is no operation with this id");
          res.status(200);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error updating or finding operation");
      res.status(500);
      res.json({ message: "Error updating or finding operation", err });
    }
  }
};

export default updateOperation;
