import {
  findNormaHistoryById,
  createNormaHistoryByFields,
  updateNormaHistoryByFields,
} from "../../../components/database/normaHistory";

const createNormaHistory = async (req, res) => {
  if (req.method === "POST") {
    const { id, norma } = req.body;

    try {
      if (id) {
        let records = await findNormaHistoryById(id);

        if (records.length !== 0) {
          records.map((item) => {
            item.fields.id = id;
            item.fields.norma = norma;
          });
          const result = await updateNormaHistoryByFields(records);
          res.json(result);
          res.status(200);
        } else {
          const result = await createNormaHistoryByFields({
            id,
            norma,
          });
          res.json(result);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error creating or finding norma history");
      res.status(500);
      res.json({ message: "Error creating or finding norma history", err });
    }
  }
};

export default createNormaHistory;
