import { findNormaHistoryById } from "../../../components/database/normaHistory";

const getNormaHistoryById = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const records = await findNormaHistoryById(id);

        res.json(records);
        res.status(200);
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding employee");
      res.status(500);
      res.json({ message: "Error finding employee", err });
    }
  }
};

export default getNormaHistoryById;
