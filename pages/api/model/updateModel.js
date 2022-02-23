import {
  findModelById,
  updateModelByFields,
} from "../../../components/database/model";

const updateModel = async (req, res) => {
  if (req.method === "PUT") {
    const { id, name } = req.body;

    try {
      if (id) {
        const initialRecord = await findModelById(id);

        if (initialRecord.length !== 0) {
          if (name) {
            const records = await updateModelByFields({
              id: initialRecord[0].id,
              fields: { id, name },
            });
            res.json({ records });
          } else {
            res.json({ message: "name is missing" });
            res.status(400);
          }
        } else {
          res.json("there is no model with this id");
          res.status(200);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error updating or finding model");
      res.status(500);
      res.json({ message: "Error updating or finding model", err });
    }
  }
};

export default updateModel;
